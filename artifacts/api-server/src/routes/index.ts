import { Router, type IRouter } from "express";
import healthRouter from "./health";
import cruxRouter from "./cruxes";
import workspaceRouter from "./workspace";

const router: IRouter = Router();

router.use(healthRouter);
router.use(cruxRouter);
router.use(workspaceRouter);

export default router;
