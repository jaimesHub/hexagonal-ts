import express, { Request, Response } from 'express';
import crypto from 'crypto';

const app = express();
const port = 3000;

app.get('/', (req: Request, res: Response) => {
    res.send('Hello, TypeScript Express!');
});

// CRUDL: Create, Read, Update, Delete, List
//        POST, GET, PUT/PATCH, DELETE, GET
// TODO: Implement CRUDL for categories

app.use(express.json()); // for parsing application/json from request body

app.post('/v1/categories', (req: Request, res: Response) => {
    const { name, image, description, parentId } = req.body as CategoryCreateDTO;

    if (name === '') {
        res.status(400).json({
            message: 'Name is required',
        });
        return;
    }

    const newId = crypto.randomUUID();
    const category: Category = {
        id: newId,
        name,
        image,
        description,
        position: categories.length + 1,
        parentId: parentId || null,
        status: CategoryStatus.Active,
        createdAt: new Date(),
        updatedAt: new Date(),
    }

    categories.push(category);

    res.status(201).json({
        data: newId,
    });
});

app.get('/v1/categories', (req: Request, res: Response) => {
    res.status(200).json({
        data: categories,
    });
});

app.get('/v1/categories/:id', (req: Request, res: Response) => {
    const { id } = req.params;

    const category = categories.find((category) => category.id === id);

    if (!category) {
        res.status(404).json({
            message: 'Category not found',
        });
        return;
    }

    res.status(200).json({
        data: category,
    });
});

app.patch('/v1/categories/:id', (req: Request, res: Response) => {
    const { id } = req.params;

    const { name, image, description, parentId, status } = req.body as CategoryUpdateDTO;

    const category = categories.find((category) => category.id === req.params.id);

    if (!category) {
        res.status(404).json({
            message: 'Category not found',
        });
        return;
    }

    if (name === '') {
        res.status(400).json({
            message: 'Name is required',
        });
        return;
    }

    if (name) {
        category.name = name;
    }

    if (image) {
        category.image = image;
    }

    if (description) {
        category.description = description;
    }

    if (parentId) {
        category.parentId = parentId;
    }

    if (status) {
        category.status = status;
    }

    category.updatedAt = new Date();

    res.status(200).json({ data: true });
});

app.delete('/v1/categories/:id', (req: Request, res: Response) => {
    const { id } = req.params;

    const category = categories.find((category) => category.id === id);

    if (!category) {
        res.status(404).json({
            message: 'Category not found',
        });
        return;
    }

    categories = categories.filter((category) => category.id !== id);

    res.status(200).json({ data: true });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

enum CategoryStatus {
    Active = 'active',
    Inactive = 'inactive',
    Deleted = 'deleted',
}

// DTO: Data Transfer Object
type CategoryCreateDTO = {
    name: string;
    image?: string;
    description?: string;
    parentId?: string | null;
}

// Other create data dto
type AnotherCategoryCreateDTO = Omit<Category, 'id' | 'position' | 'createdAt' | 'updatedAt'>;

type CategoryUpdateDTO = {
    name?: string;
    image?: string;
    description?: string;
    parentId?: string | null;
    status?: CategoryStatus;
}

// Other update data dto
type AnotherCategoryUpdateDTO = Pick<Category, 'name' | 'image' | 'description' | 'parentId' | 'status'>;

// business model/entity/object
type Category = {
    id: string;
    name: string;
    image?: string;
    description?: string;
    position: number;
    parentId: string | null;
    status: CategoryStatus;
    createdAt: Date;
    updatedAt: Date;
};

let categories: Category[] = [
    {
        id: '017f692a-6dd1-7000-9b23-458815bc85c0',
        name: 'Category 1',
        image: 'https://via.placeholder.com/150',
        description: 'This is the first category',
        position: 1,
        parentId: null,
        status: CategoryStatus.Active,
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: '017f692a-6dd1-7000-9b23-458815bc85c1',
        name: 'Category 2',
        image: 'https://via.placeholder.com/150',
        description: 'This is the second category',
        position: 2,
        parentId: null,
        status: CategoryStatus.Active,
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: '017f692a-6dd1-7000-9b23-458815bc85c2',
        name: 'Category 3',
        image: 'https://via.placeholder.com/150',
        description: 'This is the third category',
        position: 3,
        parentId: null,
        status: CategoryStatus.Active,
        createdAt: new Date(),
        updatedAt: new Date(),
    },
];
