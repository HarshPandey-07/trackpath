import "dotenv/config";
import mongoose from "mongoose";
import { before, after, beforeEach } from "node:test";

import User from "../src/model/User.js";
import Application from "../src/model/Application.js";

const TEST_DB = process.env.TEST_DB;

before(async () => {
	await mongoose.connect(TEST_DB);
});

beforeEach(async () => {
	await User.deleteMany({});
	await Application.deleteMany({});
});

after(async () => {
	await mongoose.connection.dropDatabase();
	await mongoose.disconnect();
});
