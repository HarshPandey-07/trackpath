import test, { beforeEach } from "node:test";
import assert from "node:assert/strict";
import request from "supertest";

import app from "../src/app.js";

let token;

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
});

// Create application
// Valid input
test("POST /api/application creates application", async () => {
	const response = await request(app)
		.post("/api/application")
		.set("Authorization", `Bearer ${token}`)
		.send({
			companyName: "Test company",
			role: "Software Developer",
			appliedDate: "2026-09-15",
		});

	assert.equal(response.statusCode, 201);
	assert.equal(response.body.message, "Application created successfully");
	assert.equal(response.body.data.companyName, "Test company");
});

// Valid input
// With application link and note
test("POST /api/application creates application with link & notes", async () => {
	const response = await request(app)
		.post("/api/application")
		.set("Authorization", `Bearer ${token}`)
		.send({
			companyName: "Test company",
			role: "Software Developer",
			appliedDate: "2026-09-15",
			applicationLink: "https://test.com",
			notes: "A test note",
		});

	assert.equal(response.statusCode, 201);
	assert.equal(response.body.message, "Application created successfully");
	assert.equal(response.body.data.notes, "A test note");
});

// Invalid input
// Empty body
test("POST /api/application gives error for empty body", async () => {
	const response = await request(app)
		.post("/api/application")
		.set("Authorization", `Bearer ${token}`)
		.send({});

	assert.equal(response.statusCode, 400);
	assert.equal(response.body.message, "Invalid request");
});

// Invalid felids
test("POST /api/application gives error for invalid (less than 2 letters) company name", async () => {
	const response = await request(app)
		.post("/api/application")
		.set("Authorization", `Bearer ${token}`)
		.send({
			companyName: "",
			role: "Software Developer",
			appliedDate: "2026-09-15",
			applicationLink: "https://test.com",
			notes: "A test note",
		});

	assert.equal(response.statusCode, 500);
});

test("POST /api/application gives error for invalid (less than 2 letters) role", async () => {
	const response = await request(app)
		.post("/api/application")
		.set("Authorization", `Bearer ${token}`)
		.send({
			companyName: "Test company",
			role: "",
			appliedDate: "2026-09-15",
			applicationLink: "https://test.com",
			notes: "A test note",
		});

	assert.equal(response.statusCode, 500);
});

test("PUT /api/application gives error for invalid input", async () => {
	const response = await request(app)
		.put("/api/application/65f1a2b3c4d5e6f7a8b9c0d1")
		.set("Authorization", `Bearer ${token}`)
		.send({ companyName: "Google" });

	assert.equal(response.statusCode, 404);
	assert.equal(response.body.message, "Application not found");
});

test("DELETE /api/application gives error for invalid input", async () => {
	const response = await request(app)
		.delete("/api/application/65f1a2b3c4d5e6f7a8b9c0d1")
		.set("Authorization", `Bearer ${token}`)
		.send({});

	assert.equal(response.statusCode, 404);
	assert.equal(response.body.message, "Application not found");
});
