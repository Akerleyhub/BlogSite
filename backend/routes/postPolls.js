/** API routes for polls. */

const db = require("../db");
const express = require("express");
const router = new express.Router();

/** GET /   get all polls
 *
 */
// GET / AND POST / WORK. 

router.get("/", async function (req, res, next) {
  try {
    const result = await db.query(
      `SELECT title, choice_text, votes
      FROM poll_title
      LEFT OUTER JOIN poll_choice
      ON poll_title.id = poll_choice.poll_title_id
      ORDER BY poll_date`
      );
    return res.json(result.rows);
  } catch (err) {
    return next(err);
  }
});


/** GET /[id]  get specific poll
 *
 */

router.get("/:id", async function (req, res, next) {
  try {
    const result = await db.query(
      `SELECT title, choice_text, votes
      FROM poll_title
      LEFT OUTER JOIN poll_choice
      ON poll_title.id = poll_choice.poll_title_id
      WHERE poll_title.id= $1`, 
      [req.params.id]
    );
    return res.json(result.rows[0]);
  } catch (err) {
    return next(err);
  }
});


/** POST /     add a new poll
 *
 */

router.post("/", async function (req, res, next) {
  try {
    //where choices is an object
    const {title, choices} = req.body;
    //console.log(title, choices);
    const result = await db.query(
      `INSERT INTO poll_title (title)
        VALUES ($1)
        RETURNING id`,
      [title]);
    for(const c of Object.values(choices))
      {
        const result2 = await db.query(
            `INSERT INTO poll_choice (choice_text, poll_title_id)
              VALUES ($1, $2)
              RETURNING id, choice_text`,
            [c, result.rows[0].id]);
      }
    //.json(result.rows[0]); shouldn't need to return anything from an insert
    return res.status(201);
  } catch (err) {
    return next(err);
  }
});


/** DELETE /[id]     delete poll
 *
 * => { message: "deleted" }
 *
 */

router.delete("/:id", async (req, res, next) => {
  try {
    await db.query("DELETE FROM poll_title WHERE id = $1", [req.params.id]);
    return res.json({ message: "deleted" });
  } catch (err) {
    return next(err);
  }
});


module.exports = router;