import { connect } from "mongoose";
import config from "config";

const mongoUri = config.get<string>("mongoUri");

export const connectDB = () => connect(mongoUri);
