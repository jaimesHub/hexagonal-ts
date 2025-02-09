import { Request, Response } from "express";

export const deleteCategoryApi = (req: Request, res: Response) => {
    // const { id } = req.params;

    // const category = categories.find((category) => category.id === id);

    // if (!category) {
    //     res.status(404).json({
    //         message: 'Category not found',
    //     });
    //     return;
    // }

    // categories = categories.filter((category) => category.id !== id);

    res.status(200).json({ data: true });
}