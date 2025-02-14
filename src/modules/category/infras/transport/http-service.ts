import { Request, Response } from "express";
import { CategoryCondDTOSchema, CategoryCreateSchema } from "../../model/dto";
import { ICategoryUseCase } from "../../interface";
import { PagingDTOSchema } from "../../../../share/model/paging";

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

    async getCategory(req: Request, res: Response) {
        // use try-catching here
        const { id } = req.params;

        const data = await this.useCase.getDetail(id);

        res.status(200).json({ data });
    }

    async updateCategory(req: Request, res: Response) {
        const { id } = req.params;
        const { success, data, error } = CategoryCreateSchema.safeParse(req.body);

        if (!success) {
            res.status(400).json({
                message: error.message,
            });

            return;
        }

        const result = await this.useCase.update(id, data);

        res.status(200).json({ data: result });
    }

    async deleteCategory(req: Request, res: Response) {
        const { id } = req.params;

        const result = await this.useCase.delete(id);

        res.status(200).json({ data: result });
    }

    async listCategory(req: Request, res: Response) {
        const { success, data: paging, error } = PagingDTOSchema.safeParse(req.query);

        if (!success) {
            res.status(400).json({
                message: 'Invalid paging',
                error: error.message,
            });

            return;
        }

        const cond = CategoryCondDTOSchema.parse(req.query);

        const result = await this.useCase.getList(cond, paging);
        res.status(200).json({ data: result, paging, filter: cond });
    }
}