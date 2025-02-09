import { Request, Response } from "express";

export const updateCategoryApi = (req: Request, res: Response) => {
    // const { id } = req.params;

    // const { name, image, description, parentId, status } = req.body as CategoryUpdateDTO;

    // const category = categories.find((category) => category.id === req.params.id);

    // if (!category) {
    //     res.status(404).json({
    //         message: 'Category not found',
    //     });
    //     return;
    // }

    // if (name === '') {
    //     res.status(400).json({
    //         message: 'Name is required',
    //     });
    //     return;
    // }

    // if (name) {
    //     category.name = name;
    // }

    // if (image) {
    //     category.image = image;
    // }

    // if (description) {
    //     category.description = description;
    // }

    // if (parentId) {
    //     category.parentId = parentId;
    // }

    // if (status) {
    //     category.status = status;
    // }

    // category.updatedAt = new Date();

    res.status(200).json({ data: true });
}