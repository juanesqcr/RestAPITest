import express from "express";
import http from "http";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compression from "compression";
import cors from "cors";
import mongoose from "mongoose";

const app = express();

app.use(
  cors({
    credentials: true,
  })
);

app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());

//create server
const server = http.createServer(app);

server.listen(8081, () => {
  console.log("Server running on http://localhost:8081/");
});

const MONGO_URL =
  "mongodb+srv://juanesqcr:Jeqr1997@test.ttocbpf.mongodb.net/?retryWrites=true&w=majority";

// init mongoose

mongoose.Promise = Promise;
mongoose.connect(MONGO_URL);
//error catcher
mongoose.connection.on("error", (error: Error) => console.log(error));
