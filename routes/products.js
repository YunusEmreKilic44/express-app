const express = require("express");

const router = express();

router.get("/api/products", (req, res) => {
  console.log(req.headers.cookie);
  console.log(req.cookies);
  console.log(req.signedCookies);

  if (req.signedCookies.hello && req.signedCookies.hello === "world") {
    return res.send([{ id: 123, name: "chicken breast", price: 12.99 }]);
  }
  return res.status(401).send({ msg: "Sorry you need the correct cookie" });
});

module.exports = router;
