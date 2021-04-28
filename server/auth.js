const express = require("express");
const router = express.Router();
const db = require("./db");

router.post("/", async (req, res) => {
  console.log(req.headers);

  // verify auth credentials
  const base64Credentials = req.body.info;
  const credentials = Buffer.from(base64Credentials, "base64").toString(
    "ascii"
  );
  const [username, password] = credentials.split(":");
  console.log(username, password);
  const result = await db.authenticate(username, password);
  if (result) {
    res.json({
      username: result.username,
      isAdmin: result.is_admin ? true : false,
      firstName: result.first_name,
      lastName: result.last_name,
    });
  } else {
    res.json(null);
  }
});

module.exports = router;
