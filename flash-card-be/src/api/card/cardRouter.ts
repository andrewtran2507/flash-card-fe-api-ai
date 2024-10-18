import express, { type Router } from "express";
import { validateRequest } from "@/common/utils/httpHandlers";
import { cardController } from "./cardController";
import { PostCardSchema } from "./cardModel";


export const cardRouter: Router = express.Router();



cardRouter.get("/", cardController.getCardsByUserName);

cardRouter.post("/", validateRequest(PostCardSchema), cardController.createCards);

cardRouter.put("/", validateRequest(PostCardSchema), cardController.updateCards);

cardRouter.delete("/", cardController.deleteCards)