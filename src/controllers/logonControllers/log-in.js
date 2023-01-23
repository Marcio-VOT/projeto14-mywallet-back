import db from "../../config/database.js";
import bcrypt from "bcryptjs";
import { v4 as uuidv4 } from "uuid";

export default async (req, res) => {
  try {
    const user = await db
      .collection("users")
      .findOne({ email: req.body.email });
    if (!user) return res.status(400).send("Invalid email or password");

    const isValidPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!isValidPassword)
      return res.status(400).send("Invalid email or password");

    const tryUser = await db
      .collection("accessTokens")
      .findOne({ userId: user._id });

    if (tryUser) {
      await db.collection("accessTokens").updateOne(
        { userId: user._id },
        {
          $set: {
            expiresAt: new Date(Date.now() - 3600 * 2000),
          },
        }
      );
      return res.send({ token: tryUser.token, name: user.name });
    } else {
      const token = uuidv4();
      await db.collection("accessTokens").insertOne({
        token,
        userId: user._id,
        expiresAt: new Date(Date.now() + 3600 * 1000 - 3600 * 3000),
      });
      res.send({ token, name: user.name });
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
};
