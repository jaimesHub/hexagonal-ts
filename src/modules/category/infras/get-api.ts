import { Request, Response } from "express";

export const getCategoryApi = (req: Request, res: Response) => {
    // const { id } = req.params;

    // const category = categories.find((category) => category.id === id);

    // if (!category) {
    //     res.status(404).json({
    //         message: 'Category not found',
    //     });
    //     return;
    // }

    res.status(200).json({
        data: 'category',
    });
}