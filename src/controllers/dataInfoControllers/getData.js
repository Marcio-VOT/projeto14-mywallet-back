import db from "../../config/database.js";

export default async (req, res) => {
  try {
    const { authorization } = req.headers;
    const token = authorization?.replace("Bearer ", "").replace("Bearer", "");

    const answer = await db.collection("accessTokens").findOne({ token });

    if (!answer) return res.sendStatus(401);

    const { expiresAt, userId } = answer;

    if (expiresAt <= Date(Date.now)) {
      console.log(expiresAt, Date(Date.now), token, userId);
      return res.sendStatus(401);
    }

    const resp = await db.collection("accountsMove").findOne({ userId });

    if (!resp) return res.send([]);

    res.send([resp.total, resp.moves]);
  } catch (error) {
    res.status(500).send(error.message);
  }
};
