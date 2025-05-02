import { Table, Model, Column, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Motor } from './Motor';
import { Tires } from './Tires';
import { Chassis } from './Chassis';
import { Level } from './Level';
import { Player } from './Player';
import { Team } from './Team';

export interface AnswerAttributes {
  id: number;
  playerId: number;
  levelId: number;
  teamId: number;
  score: number;
  motorId?: number;  // Opcional
  tiresId?: number;  // Opcional
  chassisId?: number;  // Opcional
  totalWeight?: number;  // Opcional
  scorePerRound?: number[];  // Nueva columna para almacenar puntajes por ronda
  timeToScore: number;
}

@Table({
  tableName: 'student_answers',
})
export class Answer extends Model<AnswerAttributes> {
  @ForeignKey(() => Motor)
  @Column
  motorId?: number;

  @BelongsTo(() => Motor)
  motor!: Motor;

  @ForeignKey(() => Tires)
  @Column
  tiresId?: number;

  @BelongsTo(() => Tires)
  tires!: Tires;

  @ForeignKey(() => Chassis)
  @Column
  chassisId?: number;

  @BelongsTo(() => Chassis)
  chassis!: Chassis;

  @Column({ type: DataType.INTEGER })
  totalWeight?: number;

  @ForeignKey(() => Level)
  @Column
  levelId!: number;

  @BelongsTo(() => Level)
  level!: Level;

  @ForeignKey(() => Player)
  @Column
  playerId!: number;

  @BelongsTo(() => Player)
  player!: Player;

  @ForeignKey(() => Team) // Define the foreign key for Team
  @Column
  teamId!: number;

  @BelongsTo(() => Team) // Define the relationship with Team
  team!: Team;

  @Column({ type: DataType.INTEGER })
  score!: number;

  @Column({
    type: DataType.JSON,
    allowNull: true,
  })
  scorePerRound?: number[];


  @Column({ type: DataType.INTEGER })
  timeToScore!: number;
  
}
