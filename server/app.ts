import { Hono } from "hono";
import { logger } from "hono/logger";
import { expensesRoute } from "./routes/expenses";
import { serveStatic } from "hono/bun";
import { is } from "drizzle-orm";
const app = new Hono();

app.use("*", logger());

// server routes
app.route("/api/expenses", expensesRoute);

// frontend routes
app.get("*", serveStatic({ root: "./frontend/dist" }));
app.get("*", serveStatic({ path: "./frontend/dist/index.html" }));

export default app;
