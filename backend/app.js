import express from "express";
import dotenv from "dotenv";
import routes from "./routes/index.route.js";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to mongo");
  })
  .catch((error) => console.log(error));

routes(app);

app.use((req, res, next) => {
  const error = new Error("not found");
  error.status = 404;
  next(error);
});

app.use((err, req, res, next) => {
  
  res.status(err.status || 500).json({
    err: {
      status: err.status || 500,
      message: err.message || "Internal Server Error",
    },
  });
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
