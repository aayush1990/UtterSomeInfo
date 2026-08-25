import { Router, type IRouter } from "express";
import { UpdatePreferencesBody } from "@workspace/api-zod";
import { learned, portfolio, preferences, runningLoops } from "./mock-data";

const router: IRouter = Router();
let currentPreferences = preferences;

router.get("/portfolio", (_req, res) => res.json(portfolio));
router.get("/running", (_req, res) => res.json(runningLoops));
router.get("/learned", (_req, res) => res.json(learned));
router.get("/preferences", (_req, res) => res.json(currentPreferences));
router.patch("/preferences", (req, res) => {
  const update = UpdatePreferencesBody.parse(req.body);
  currentPreferences = { ...currentPreferences, ...update };
  res.json(currentPreferences);
});

export default router;