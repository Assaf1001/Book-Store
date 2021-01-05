const express = require("express");
const cors = require("cors");
require("./db/mongoose");

const userRouter = require("./routers/userRouter");

const port = process.env.PORT;
const app = express();

const corsOptions = {
  origin: "http://localhost:3000",
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(userRouter);

app.get("/", (req, res) => {
  res.send("Server is connecet");
});

app.listen(port, () => {
  console.log("Server is connected, Port:", port);
});
