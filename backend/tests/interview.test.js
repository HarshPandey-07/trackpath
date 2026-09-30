import test, { beforeEach } from "node:test";
import assert from "node:assert/strict";
import request from "supertest";

import app from "../src/app.js";

let token;
let applicationId;

// This beforeEach ONLY runs for tests inside this file
beforeEach(async () => {
	// 1. Create a dummy user because the DB was just wiped clean by the global setup
	await request(app).post("/api/auth/register").send({
		name: "Test User",
		email: "test@example.com",
		password: "password123",
	});

	// 2. Log them in to grab the token
	const login = await request(app).post("/api/auth/login").send({
		email: "test@example.com",
		password: "password123",
	});

	token = login.body.token;

	// 3. Create application, so that the interviews can be created
	const application = await request(app)
		.post("/api/applications")
		.set("Authorization", `Bearer ${token}`)
		.send({
			companyName: "Test company",
			role: "Software Developer",
			appliedDate: "2026-09-15",
		});

	applicationId = application.body.data._id;
});

// Create application
// Valid input
test("POST /api/interviews creates interview", async () => {
	const response = await request(app)
		.post("/api/interviews")
		.set("Authorization", `Bearer ${token}`)
		.send({
			application: applicationId,
			round: "Technical 1",
		});

	assert.equal(response.statusCode, 201);
	assert.equal(response.body.message, "Interview created successfully");
	assert.equal(response.body.data.round, "Technical 1");
});

// Invalid input
test("POST /api/interviews gives error for empty body", async () => {
	const response = await request(app)
		.post("/api/interviews")
		.set("Authorization", `Bearer ${token}`)
		.send({});

	assert.equal(response.statusCode, 400);
	assert.equal(response.body.message, "Invalid request");
});

// Get
test("GET /api/interviews gives interviews with company name and role", async () => {
	await request(app)
		.post("/api/interviews")
		.set("Authorization", `Bearer ${token}`)
		.send({
			application: applicationId,
			round: "Technical 1",
		});

	const response = await request(app)
		.get("/api/interviews")
		.set("Authorization", `Bearer ${token}`);

	assert.equal(response.statusCode, 200);
	assert.equal(response.body.data[0].application.companyName, "Test company");
	assert.equal(response.body.data[0].application.role, "Software Developer");
});
