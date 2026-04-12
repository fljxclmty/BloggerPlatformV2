import { Router } from "express";
import { Request, Response } from "express";
import { client } from "../db/mongo-db";
import { HttpStatus } from "../common/statuses";

export const testingRouter = Router();

testingRouter.delete("/all-data", async (req: Request, res: Response) => {
  try {
    const db = client.db();

    const collectionsToClear = ["blogs", "posts", "users", "comments"];

    await Promise.all(
      collectionsToClear.map((collectionName) =>
        db.collection(collectionName).deleteMany({}),
      ),
    );

    console.log("✅ All data cleared successfully");
    res.sendStatus(HttpStatus.NoContent);
  } catch (e) {
    console.error("❌ Error during data deletion:", e);

    res.status(HttpStatus.InternalServerError).send({
      error: "An error occurred while clearing the database",
      details: e instanceof Error ? e.message : "Unknown error",
    });
  }
});
