import { Request, Response } from "express";
import { CategoryPersistence } from "./repository/dto";
import { Op } from "sequelize";
import { CategoryStatus } from "../model/model";
import { PagingDTOSchema } from "../../../share/model/paging";

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