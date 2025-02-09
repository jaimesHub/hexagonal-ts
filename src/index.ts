import { config } from 'dotenv';
import express, { Request, Response } from 'express';
import { v7 } from 'uuid';
import { CategoryStatus } from './modules/category/model/model';
import { CategoryCreateSchema, CategoryUpdateDTO } from './modules/category/model/dto';
import { Category } from './modules/category/model/model';
import { setupCategoryModule } from './modules/category';

config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json()); // for parsing application/json from request body

app.get('/', (req: Request, res: Response) => {
    res.send('Hello, TypeScript Express!');
});

app.use('/v1', setupCategoryModule());

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
