import test from "node:test";
import assert from "node:assert/strict";
import request from "supertest";

import app from "../src/app.js";

// Register tests
// Valid input
test("POST /api/auth/register creates a user", async () => {
	const response = await request(app).post("/api/auth/register").send({
		name: "Test User",
		email: "test@example.com",
		password: "password123",
	});

	assert.equal(response.statusCode, 201);
	assert.equal(response.body.user.email, "test@example.com");
});

// Double value
test("POST /api/auth/register gives error for double user", async () => {
	await request(app).post("/api/auth/register").send({
		name: "Test User",
		email: "test@example.com",
		password: "password123",
	});

	const response = await request(app).post("/api/auth/register").send({
		name: "Test User",
		email: "test@example.com",
		password: "password123",
	});

	assert.equal(response.statusCode, 409);
	assert.equal(response.body.message, "User already exists");
});

// Empty email
test("POST /api/auth/register gives error for empty email", async () => {
	const response = await request(app).post("/api/auth/register").send({
		name: "Test User",
		password: "password123",
	});

	assert.equal(response.statusCode, 400);
	assert.equal(response.body.message, "Invalid request");
});

// Empty name
test("POST /api/auth/register gives error for empty name", async () => {
	const response = await request(app).post("/api/auth/register").send({
		email: "test@example.com",
		password: "password123",
	});

	assert.equal(response.statusCode, 400);
	assert.equal(response.body.message, "Invalid request");
});

// Empty password
test("POST /api/auth/register gives error for empty password", async () => {
	const response = await request(app).post("/api/auth/register").send({
		name: "Test User",
		email: "test@example.com",
	});

	assert.equal(response.statusCode, 400);
	assert.equal(response.body.message, "Invalid request");
});

// Login tests
// Valid input
test("POST /api/auth/login logs in a user", async () => {
	await request(app).post("/api/auth/register").send({
		name: "Test User",
		email: "test@example.com",
		password: "password123",
	});

	const response = await request(app).post("/api/auth/login").send({
		email: "test@example.com",
		password: "password123",
	});

	assert.equal(response.statusCode, 200);
	assert.equal(response.body.message, "User logged in successfully");
});

// Empty email
test("POST /api/auth/login gives error for empty email", async () => {
	await request(app).post("/api/auth/register").send({
		name: "Test User",
		email: "test@email.com",
		password: "password123",
	});

	const response = await request(app).post("/api/auth/login").send({
		password: "password123",
	});

	assert.equal(response.statusCode, 400);
	assert.equal(response.body.message, "Invalid request");
});

// Empty password
test("POST /api/auth/login gives error for empty password", async () => {
	await request(app).post("/api/auth/register").send({
		name: "Test User",
		email: "test@example.com",
		password: "password123",
	});

	const response = await request(app).post("/api/auth/login").send({
		email: "test@example.com",
	});

	assert.equal(response.statusCode, 400);
	assert.equal(response.body.message, "Invalid request");
});
