const express = require("express");
const cors = require("cors");
require("./db/mongoose");

const userRouter = require("./routers/userRouter");
const bookRouter = require("./routers/bookRouter");
const generalRouter = require("./routers/generalRouter");

const port = process.env.PORT;
const app = express();

const corsOptions = {
    origin: "http://localhost:3000",
    optionsSuccessStatus: 201,
};

app.use(express.json());
app.use(cors(corsOptions));
app.use(userRouter);
app.use(bookRouter);
app.use(generalRouter);

app.listen(port, () => {
    console.log("Server is connected, Port:", port);
});
