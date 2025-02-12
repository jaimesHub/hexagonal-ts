import { CategoryCreateSchema } from "../model/dto";

import { Request, Response } from "express";
import { CategoryPersistence } from "./repository/dto";
import { v7 } from "uuid";

export const createCategoryApi = () => async (req: Request, res: Response) => {
    const { success, data, error } = CategoryCreateSchema.safeParse(req.body);

    if (!success) {
        res.status(400).json({
            message: error.message,
        });

        return;
    }

    const newId = v7();
    await CategoryPersistence.create({ id: newId, ...data });

    res.status(201).json({
        data: newId,
    });
}

// export async function createCategoryApi(req: Request, res: Response): Promise<void> {
//     const { success, data, error } = CategoryCreateSchema.safeParse(req.body);

//     if (!success) {
//         res.status(400).json({
//             message: error.message,
//         });

//         return;
//     }

//     const newId = v7();
//     await CategoryPersistence.create({ id: newId, ...data });

//     res.status(201).json({
//         data: newId,
//     });
// }