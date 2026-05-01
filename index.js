const express = require("express");

const app = express();

const usersRouter = require("./routes/users");
const productsRouter = require("./routes/products");

app.use(express.json());

app.use(usersRouter);
app.use(productsRouter);

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.status(201).send({ msg: "Hello" });
});

app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}...`);
});
