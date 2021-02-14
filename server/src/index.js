const express = require("express");
const cors = require("cors");
require("./db/mongoose");

const userRouter = require("./routers/userRouter");
const bookRouter = require("./routers/bookRouter");
const generalRouter = require("./routers/generalRouter");

const port = process.env.PORT;
const app = express();

const whiteList = [
    "http://localhost:3000",
    "https://assaf-harush-manga-client.herokuapp.com",
];
const corsOptions = {
    origin: function (origin, callback) {
        if (whiteList.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
};

app.use(express.json());
app.use(cors(corsOptions));
app.use(userRouter);
app.use(bookRouter);
app.use(generalRouter);

app.listen(port, () => {
    console.log("Server is connected, Port:", port);
});
