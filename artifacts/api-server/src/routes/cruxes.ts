import { Router, type IRouter } from "express";
import {
  AskCruxBody,
  AskCruxParams,
  GetCruxParams,
  ResolveCruxBody,
  ResolveCruxParams,
} from "@workspace/api-zod";
import { cruxes } from "./mock-data";

const router: IRouter = Router();

router.get("/cruxes", (_req, res) => {
  res.json(cruxes);
});

router.get("/cruxes/:id", (req, res) => {
  const params = GetCruxParams.parse(req.params);
  const crux = cruxes.find((item) => item.id === params.id);
  if (!crux) {
    res.status(404).json({ error: "Crux not found" });
    return;
  }
  res.json(crux);
});

router.post("/cruxes/:id/resolve", (req, res) => {
  const params = ResolveCruxParams.parse(req.params);
  const body = ResolveCruxBody.parse(req.body);
  const crux = cruxes.find((item) => item.id === params.id);
  if (!crux) {
    res.status(404).json({ error: "Crux not found" });
    return;
  }
  const option = crux.options.find((item) => item.id === body.optionId);
  if (!option) {
    res.status(400).json({ error: "Unknown resolution option" });
    return;
  }
  crux.selectedResolution = option.label;
  crux.status = "deploying";
  crux.deploymentStatus = "Deployment artifact created · 0/4 actions complete";
  res.json(crux);
});

router.post("/cruxes/:id/conversation", (req, res) => {
  const params = AskCruxParams.parse(req.params);
  const body = AskCruxBody.parse(req.body);
  const crux = cruxes.find((item) => item.id === params.id);
  if (!crux) {
    res.status(404).json({ error: "Crux not found" });
    return;
  }
  const normalized = body.message.toLowerCase();
  const message = normalized.includes("half") || normalized.includes("cost")
    ? "At half the spend, the recommendation shifts to the limited rollout. Confidence drops 9 points, but the downside stays contained while we learn."
    : normalized.includes("downside") || normalized.includes("risk")
      ? `The main downside is support load: ${crux.simulations[0]?.supportLoad ?? "higher than planned"} in the fastest path. The reversible option keeps that exposure bounded.`
      : "The recommendation is driven by the gap between expected value and the amount of human attention this needs. I would keep the reversible path open.";
  res.json({
    agent: body.participant ?? crux.participants[0]?.name ?? "Your Twin",
    message,
    confidenceShift: normalized.includes("half") ? -9 : 2,
  });
});

export default router;