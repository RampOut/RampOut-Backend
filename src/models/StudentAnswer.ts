import { Table, Column, Model, DataType, CreatedAt, UpdatedAt } from 'sequelize-typescript';

@Table({
  tableName: 'student_answers',
  timestamps: true,  
})
export class StudentAnswer extends Model {
  
  @Column({ type: DataType.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true })
  id!: number;

  @Column({ type: DataType.INTEGER.UNSIGNED})
  playerId!: number;

  @Column({ type: DataType.INTEGER.UNSIGNED })
  levelId!: number;

  @Column({ type: DataType.FLOAT })
  answer!: number;

  @Column({ type: DataType.INTEGER })
  score!: number;

  @CreatedAt
  @Column({ type: DataType.DATE })
  createdAt!: Date;

  @UpdatedAt
  @Column({ type: DataType.DATE })
  updatedAt!: Date;
}
