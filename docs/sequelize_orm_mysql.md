# Sequelize ORM MySQL

## Install sequelize & dotenv

```bash
npm i -D @types/dotenv @types/sequelize @types/uuid
npm i dotenv sequelize zod mysql2 uuid
```

```typescript
// dotenv
// zod: validation package
// // prompt: type Category => validate zod

// organizing code horizontally - model & dto
// organizing code horizontally - infras (controller/transport/infras)
// organizing code horizontally - integrating ORM library
// // - sequelize:
// // // - sample sequelize config, adding system params for mysql
// // // - pool/connection pool (sequelize.ts): max, min, acquire, idle
// // - other: prisma
// organizing code horizontally - interacting w category table
```

## Sample env file

```bash
DB_HOST=localhost
DB_USERNAME=root
DB_PASSWORD=ead8686ba57479778a76e
DB_NAME=demo
DB_PORT=3309
DB_TYPE=mysql
```

## Sample sequelize config

```bash
import { config } from "dotenv";
import { Sequelize } from "sequelize";

config();

export const sequelize = new Sequelize({
  database: process.env.DB_NAME || "",
  username: process.env.DB_USERNAME || "",
  password: process.env.DB_PASSWORD || "",
  host: process.env.DB_HOST || "",
  port: parseInt(process.env.DB_PORT as string),
  dialect: "mysql",
  pool:
  {
    max: 20,
    min: 2,
    acquire: 30000,
    idle: 60000,
  },
  logging: false,
});
```

## Sample persistence model

```bash
import { DataTypes, Model, Sequelize } from "sequelize";

export class CategoryPersistence extends Model {
  declare id: string;
}

export const modelName = "Category";

export function init(sequelize: Sequelize) {
  CategoryPersistence.init
  (
    {
      id:
      {
        type: DataTypes.STRING,
        primaryKey: true,
      },

      name:
      {
        type: DataTypes.STRING,
        allowNull: false,
      },

      image:
      {
        type: DataTypes.STRING,
        allowNull: true,
      },

      parentId:
      {
        type: DataTypes.STRING,
        field: "parent_id",
        allowNull: true,
      },

      description:
      {
        type: DataTypes.STRING,
        allowNull: true,
      },

      status:
      {
        type: DataTypes.ENUM("active", "inactive", "deleted"),
        allowNull: false,
        defaultValue: "active",
      },
    },
    {
      sequelize,
      modelName: modelName,
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
      tableName: "categories",
    }
  );
}

// CategoryPersistence.belongsTo(CategoryPersistence, { foreignKey: { field: 'parent_id' }, as: 'parent' });
```
