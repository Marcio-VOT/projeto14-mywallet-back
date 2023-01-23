import db from "../../config/database.js";

export default async (req, res) => {
  const { authorization } = req.headers;
  const token = authorization?.replace("Bearer ", "");

  try {
    const { expiresAt, userId } = await db
      .collection("accessTokens")
      .findOne({ token });

    if (!token || !userId) return res.sendStatus(401);

    if (expiresAt <= Date(Date.now)) return res.sendStatus(401);

    const resp = await db.collection("accountsMove").findOne({ userId });

    if (!resp) return res.send([]);

    console.log(resp);

    res.send([resp.total, resp.moves]);
  } catch (error) {
    res.status(500).send(error.message);
  }
};
