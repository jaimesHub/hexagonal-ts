import { Request, Response } from "express";
import { CategoryPersistence } from "./repository/dto";
import { z } from 'zod';
import { Op } from "sequelize";
import { CategoryStatus } from "../model/model";

const PagingDTOSchema = z.object({
    page: z.coerce.number().int().min(1).default(1),
    limit: z.coerce.number().int().min(1).max(100).default(10),
    total: z.coerce.number().int().min(0).default(0).optional(),
});

type PagingDTO = z.infer<typeof PagingDTOSchema>;

export const listCategoryApi = () => async (req: Request, res: Response) => {
    const { success, data, error } = PagingDTOSchema.safeParse(req.query);

    if (!success) {
        res.status(400).json({
            title: 'Invalid paging',
            message: error.message,
        });

        return;
    }

    const { page, limit } = data;

    const cond = { [Op.ne]: CategoryStatus.Deleted }

    const total = await CategoryPersistence.count({
        where: {
            status: cond,
        },
    });

    const rows = await CategoryPersistence.findAll({
        where: {
            status: cond,
        },
        order: [['created_at', 'DESC']],
        limit,
        offset: (page - 1) * limit,
    });

    data.total = total;

    res.status(200).json({
        data: rows,
        paging: data,
    });
}