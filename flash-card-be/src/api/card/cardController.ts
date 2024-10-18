import type { Request, RequestHandler, Response } from "express";
import { handleServiceResponse } from "@/common/utils/httpHandlers";
import { cardService } from "./cardService";
import { ObjectId } from "mongodb";

class CardController {
    public getCardsByUserName: RequestHandler = async (_req: Request, res: Response) => {
        const user_name = String(_req.query.user_name)
        const serviceResponse = await cardService.findAllByUserName(user_name);
        return handleServiceResponse(serviceResponse, res);
    };

    public createCards: RequestHandler = async (req: Request, res: Response) => {
        const { user_name, text } = req.body
        const serviceResponse = await cardService.insert(text, user_name);
        return handleServiceResponse(serviceResponse, res);
    };

    public updateCards: RequestHandler = async (req: Request, res: Response) => {
        const { user_name, text, id } = req.body
        const serviceResponse = await cardService.update(text, user_name, id);
        return handleServiceResponse(serviceResponse, res);
    };

    public deleteCards: RequestHandler = async (req: Request, res: Response) => {
        const { id } = req.query
        const serviceResponse = await cardService.delete(new ObjectId(String(id)));
        return handleServiceResponse(serviceResponse, res);
    };
}

export const cardController = new CardController();
