import { Request, Response } from "express";
import { CategoryCreateSchema } from "../../model/dto";
import { ICategoryUseCase } from "../../interface";

export class CategoryHttpService {
    constructor(private readonly useCase: ICategoryUseCase) { }

    // API
    async createCategory(req: Request, res: Response) {
        const { success, data, error } = CategoryCreateSchema.safeParse(req.body);

        if (!success) {
            res.status(400).json({
                message: error.message,
            });

            return;
        }

        const result = await this.useCase.create(data);

        res.status(201).json({ data: result });
    }
}