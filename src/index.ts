import { config } from 'dotenv';
import express, { Request, Response } from 'express';
import { setupCategoryModule } from './modules/category';
import { sequelize } from './share/component/sequelize';

config();

(async () => {
    sequelize.authenticate();
    console.log('Connection has been established successfully.');

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
})();


