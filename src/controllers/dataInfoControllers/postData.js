import db from "../../config/database.js";
import dayjs from "dayjs";

export default async (req, res) => {
  const { authorization } = req.headers;
  const { disc, value, type } = req.body;
  const token = authorization?.replace("Bearer ", "");

  try {
    const { expiresAt, userId } = await db
      .collection("accessTokens")
      .findOne({ token });

    if (!token || !userId) return res.sendStatus(401);

    if (expiresAt <= Date(Date.now)) return res.sendStatus(401);

    let resp = await db.collection("accountsMove").findOne({ userId });

    if (!resp) {
      const total = type ? +value : -value;
      const moves = [{ date: dayjs().format("DD/MM"), disc, value, type }];
      await db.collection("accountsMove").insertOne({
        userId,
        total,
        moves,
      });
      return res.sendStatus(200);
    }
    let { total, moves } = resp;

    total += type ? +value : -value;

    await db.collection("accountsMove").updateOne(
      { userId },
      {
        $set: {
          total,
          moves: [
            ...moves,
            { date: dayjs().format("DD/MM"), disc, value, type },
          ],
        },
      }
    );
    console.log([
      ...moves,
      { date: dayjs().format("DD/MM"), disc, value, type },
    ]);

    res.sendStatus(200);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

/*  {
      token: accessToken,
      userId: user._id,
      expiresAt: new Date(Date.now() + 3600 * 1000),
'       {
        date:"dd/mm",
        disc:"blablabla",
        value:"545454",
        type: true/flase
}
    }*/
