// models/Student.ts
import { Model, DataTypes, Sequelize } from 'sequelize';

export class Student extends Model {
  public id!: number;
  public name!: string;
}

export function initStudentModel(sequelize: Sequelize) {
  Student.init({
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    sequelize,
    tableName: 'students',
    timestamps: false, 
  });

  return Student;
}
