import { Model, DataTypes, Sequelize } from 'sequelize';

export class StudentAnswer extends Model {
  public id!: number;
  public studentId!: number;
  public levelId!: number;
  public answer!: number;
  public score!: number;

  // timestamps automáticos (opcional)
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export function initStudentAnswerModel(sequelize: Sequelize) {
  StudentAnswer.init({
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    studentId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    levelId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    answer: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    score: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {
    sequelize,
    tableName: 'student_answers',
    timestamps: true,
  });

  return StudentAnswer;
}
