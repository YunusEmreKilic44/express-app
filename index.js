const express = require("express");

const app = express();

const PORT = process.env.PORT || 3000;

const mockUsers = [
  { id: 1, username: "anson", displayName: "Anson" },
  { id: 2, username: "jack", displayName: "Jack" },
  { id: 3, username: "adam", displayName: "Adam" },
  { id: 4, username: "tina", displayName: "Tina" },
  { id: 5, username: "jason", displayName: "Jason" },
  { id: 6, username: "henry", displayName: "Henry" },
  { id: 7, username: "marilyn", displayName: "Marilyn" },
];

app.get("/", (req, res) => {
  res.status(201).send({ msg: "Hello" });
});

app.get("/api/users", (req, res) => {
  console.log(req.query);
  const {
    query: { filter, value },
  } = req;

  // when filter and value are undefined

  if (filter && value) {
    return res.send(mockUsers.filter((user) => user[filter].includes(value)));
  }
  return res.send(mockUsers);
});

app.get("/api/users/:id", (req, res) => {
  console.log(req.params);
  const parseId = parseInt(req.params.id);
  console.log(parseId);

  if (isNaN(parseId)) {
    return res.status(400).send({ msg: "Bad Request. Invalid Id" });
  }

  const findUser = mockUsers.find((user) => user.id === parseId);

  if (!findUser) {
    return res.status(404).send({ msg: "Bad Request. Invalid Id" });
  }

  return res.send(findUser);
});

app.get("/api/products", (req, res) => {
  res.send([{ id: 123, name: "chicken breast", price: 12.99 }]);
});

app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}...`);
});
