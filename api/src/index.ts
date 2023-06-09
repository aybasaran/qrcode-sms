import Express from "express";
import config from "config";
import { connectDB } from "./utils/db.util";

import qrRoutes from "./routes/qr.route";

import cors from "cors";

const app = Express();

const PORT = config.get("PORT") as number;
const CLIENT_URL = config.get("clientUrl") as string;

app.use(Express.json());
app.use(Express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: CLIENT_URL,
  })
);

app.use("/api/qr", qrRoutes);

connectDB()
  .then(() => {
    console.log("Connected to MongoDB!");
    app.listen(PORT, () => {
      console.log(`Server is listening on port ${PORT}!`);
    });
  })
  .catch((error) => {
    console.log("Error connecting to MongoDB", error);
    process.exit(1);
  });
