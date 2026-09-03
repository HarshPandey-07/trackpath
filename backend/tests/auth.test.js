import test from "node:test";
import assert from "node:assert/strict";
import request from "supertest";

import app from "../src/app.js";

test("POST /api/auth/register creates a user", async () => {
	const response = await request(app).post("/api/auth/register").send({
		name: "Test User",
		email: "test@example.com",
		password: "password123",
	});

	assert.equal(response.statusCode, 201);
	assert.equal(response.body.user.email, "test@example.com");
});
