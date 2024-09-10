import { DataTypes } from "sequelize";
import { sequelize } from "../database/configDB.js";

export const Embeddings = sequelize.define("Embeddings", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    embedding: {
        type: DataTypes.BLOB('long'),
        allowNull: false,
    },
    label: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
    updatedAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
},
{
    timestamps: true,
    createdAt: "createdAt",
    updatedAt: "updatedAt",
    tableName: "embeddings",
},
);