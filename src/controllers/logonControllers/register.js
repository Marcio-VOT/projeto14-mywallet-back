import bcrypt from "bcryptjs";
import db from "../../config/database.js";

export default async (req, res) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);
  try {
    await db.collection("users").insertOne({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
    });
    res.sendStatus(200);
  } catch (err) {
    res.status(500).send("Error registering user");
  }
};
