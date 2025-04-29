import { Table, Column, Model, DataType, ForeignKey, BelongsTo, CreatedAt, UpdatedAt } from 'sequelize-typescript';
import { Optional } from "sequelize";
import { Player } from "./Player"; 
import { Level } from "./Level"; 

interface StudentAnswerAttributes {
  id: number;
  playerId: number;
  levelId: number;
  answer: number;
  score: number;
  createdAt: Date;
  updatedAt: Date;
}

interface StudentAnswerCreationAttributes extends Optional<StudentAnswerAttributes, 'id'> {}

@Table({
  tableName: 'student_answers', 
  timestamps: true,  
})

export class StudentAnswer extends Model<StudentAnswerAttributes, StudentAnswerCreationAttributes> {
  
  @Column({
    type: DataType.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true
  })
  id!: number;

  @ForeignKey(() => Player)
  @Column({ type: DataType.INTEGER.UNSIGNED })
  playerId!: number;

  @ForeignKey(() => Level)
  @Column({ type: DataType.INTEGER.UNSIGNED })
  levelId!: number;

  @Column({ type: DataType.FLOAT, allowNull: false })
  answer!: number;

  @Column({ type: DataType.INTEGER, allowNull: false })
  score!: number;

  @BelongsTo(() => Player)
  player!: Player;

  @BelongsTo(() => Level)
  level!: Level;
}