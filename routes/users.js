const express = require("express");
const {
  query,
  validationResult,
  body,
  matchedData,
  checkSchema,
} = require("express-validator");

const createUserValidationSchema = require("../validationSchemas");
const resolveUserById = require("../middlewares");
const mockUsers = require("../mockUsers");

const router = express.Router();

router.get(
  "/api/users",
  query("filter")
    .isString()
    .notEmpty()
    .withMessage("Must not be empty")
    .isLength({ min: 3, max: 10 })
    .withMessage("Must be at least 3 - 10 characters"),
  (req, res) => {
    const result = validationResult(req);
    console.log(result);
    const {
      query: { filter, value },
    } = req;

    // when filter and value are undefined

    if (filter && value) {
      return res.send(mockUsers.filter((user) => user[filter].includes(value)));
    }
    return res.send(mockUsers);
  },
);

router.post(
  "/api/users",
  checkSchema(createUserValidationSchema),
  (req, res) => {
    console.log(req.body);
    const result = validationResult(req);
    console.log(result);

    if (!result.isEmpty()) {
      return res.status(400).send({ errors: result.array() });
    }

    const data = matchedData(req);

    const newUser = { id: mockUsers[mockUsers.length - 1].id + 1, ...data };
    mockUsers.push(newUser);
    return res.status(201).send(newUser);
  },
);

router.get("/api/users/:id", resolveUserById, (req, res) => {
  const { findUserIndex } = req;

  const findUser = mockUsers[findUserIndex];

  if (!findUser) {
    return res.status(404).send({ msg: "Bad Request. Invalid Id" });
  }

  return res.send(findUser);
});

router.put("/api/users/:id", resolveUserById, (req, res) => {
  const { body, findUserIndex } = req;

  mockUsers[findUserIndex] = { id: mockUsers[findUserIndex].id, ...body };
  return res.sendStatus(200);
});

router.patch("/api/users/:id", resolveUserById, (req, res) => {
  const { body, findUserIndex } = req;

  mockUsers[findUserIndex] = { ...mockUsers[findUserIndex], ...body };

  return res.sendStatus(200);
});

router.delete("/api/users/:id", resolveUserById, (req, res) => {
  const { findUserIndex } = req;

  mockUsers.splice(findUserIndex, 1);

  return res.sendStatus(200);
});

module.exports = router;
