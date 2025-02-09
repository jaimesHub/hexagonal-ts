import { Request, Response } from "express";

export const createCategoryApi = (req: Request, res: Response) => {
    // const { success, data, error } = CategoryCreateSchema.safeParse(req.body);

    // if (!success) {
    //     res.status(400).json({
    //         message: error.message,
    //     });
    //     return;
    // }

    // const { name, image, description, parentId } = data;

    // const newId = v7();
    // const category: Category = {
    //     id: newId,
    //     name,
    //     image,
    //     description,
    //     position: categories.length + 1,
    //     parentId: parentId || null,
    //     status: CategoryStatus.Active,
    //     createdAt: new Date(),
    //     updatedAt: new Date(),
    // }

    // categories.push(category);

    res.status(201).json({
        data: "newId",
        // data: data,
    });
}