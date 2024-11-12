import app from "./app";
const port = process.env.PORT || 3000;
Bun.serve({
  port: 3000,
  fetch: app.fetch,
});
