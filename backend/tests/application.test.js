import test from "node:test";
import assert from "node:assert/strict";
import request from "supertest";

import app from "../src/app.js";

// Create application
// Valid input
test("POST /api/application creates application", async () => {
	await request(app).post("/api/auth/register").send({
		name: "Test User",
		email: "test@example.com",
		password: "password123",
	});

	const login = await request(app).post("/api/auth/login").send({
		email: "test@example.com",
		password: "password123",
	});

	const token = login.body.token;

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
	await request(app).post("/api/auth/register").send({
		name: "Test User",
		email: "test@example.com",
		password: "password123",
	});

	const login = await request(app).post("/api/auth/login").send({
		email: "test@example.com",
		password: "password123",
	});

	const token = login.body.token;

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
	await request(app).post("/api/auth/register").send({
		name: "Test User",
		email: "test@example.com",
		password: "password123",
	});

	const login = await request(app).post("/api/auth/login").send({
		email: "test@example.com",
		password: "password123",
	});

	const token = login.body.token;

	const response = await request(app)
		.post("/api/application")
		.set("Authorization", `Bearer ${token}`)
		.send({});

	assert.equal(response.statusCode, 400);
	assert.equal(response.body.message, "Invalid request");
});

// Invalid felids
test("POST /api/application gives error for invalid (less than 2 letters) company name", async () => {
	await request(app).post("/api/auth/register").send({
		name: "Test User",
		email: "test@example.com",
		password: "password123",
	});

	const login = await request(app).post("/api/auth/login").send({
		email: "test@example.com",
		password: "password123",
	});

	const token = login.body.token;

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
	await request(app).post("/api/auth/register").send({
		name: "Test User",
		email: "test@example.com",
		password: "password123",
	});

	const login = await request(app).post("/api/auth/login").send({
		email: "test@example.com",
		password: "password123",
	});

	const token = login.body.token;

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
