import express from "express";
import { setupApp } from "./setup-app";
import dotenv from "dotenv";
import { runDb } from "./db/mongo-db";

dotenv.config();

const bootstrap = async () => {
  const app = express();

  setupApp(app);

  await runDb();

  const server = app.listen(Number(process.env.PORT) || 3000, "0.0.0.0", () => {
    console.log(`App listening on port ${process.env.PORT || 3000}`);
    console.log(
      `Server running at http://localhost:${process.env.PORT || 3000}`,
    );
  });

  server.on("error", (error: any) => {
    console.error("Server error:", error);
    if (error.code === "EADDRINUSE") {
      console.error(`Port ${process.env.PORT} is already in use`);
    }
  });

  return server;
};

bootstrap().catch(console.dir);
