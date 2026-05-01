const express = require("express");

const router = express();

router.get("/api/products", (req, res) => {
  res.send([{ id: 123, name: "chicken breast", price: 12.99 }]);
});

module.exports = router;
