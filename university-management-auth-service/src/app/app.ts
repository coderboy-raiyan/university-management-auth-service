import express, { Application, Request, Response } from "express";
const app: Application = express();

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({ baseUrl: "http://localhost:5000/", health: "good" });
});

export default app;
