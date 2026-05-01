const express = require("express");
const cookieParser = require("cookie-parser");
const session = require("express-session");

const app = express();

const usersRouter = require("./routes/users");
const productsRouter = require("./routes/products");

app.use(express.json());
app.use(cookieParser("helloworld"));
app.use(
  session({
    secret: "anson the dev",
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 60000 * 60,
    },
  }),
);

app.use(usersRouter);
app.use(productsRouter);

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  console.log(req.session);
  console.log(req.session.id);
  req.session.visited = true;
  res.cookie("hello", "world", {
    maxAge: 60000 * 60,
    signed: true,
  });
  res.status(201).send({ msg: "Hello" });
});

app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}...`);
});
