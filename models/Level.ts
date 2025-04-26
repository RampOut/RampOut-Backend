// models/Level.ts
import { Model, DataTypes, Sequelize } from 'sequelize';

export class Level extends Model {
  public id!: number;
  public name!: string;
  public description!: string;
}

export function initLevelModel(sequelize: Sequelize) {
  Level.init({
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    expectedAnswer: {   // Agregar aquí la propiedad
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  }, {
    sequelize,
    tableName: 'levels',
    timestamps: false, // Si no usas createdAt/updatedAt
  });

  return Level;
}
