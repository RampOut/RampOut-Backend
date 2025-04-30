import { Table, Model, Column, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Motor } from './Motor';
import { Tires } from './Tires';
import { Chassis } from './Chassis';
import { Level } from './Level';
import { Player } from './Player';
import { Team } from './Team';

interface StudentAnswerAttributes {
  id: number;
  motorId: number;               // Relation with the Motor model
  tiresId: number;               // Relation with the Tires model
  chassisId: number;             // Relation with the Chassis model
  totalWeight: number;           // Total weight of the vehicle with which the player is playing
  levelId: number;               // Relation with the Level model
  playerId: number;              // Relation with the Player model
  teamId: number;
  score: number;                 // The score obtained
}

@Table({
  tableName: 'student_answers',
})
export class StudentAnswer extends Model<StudentAnswerAttributes> {
  @ForeignKey(() => Motor)
  @Column
  motorId!: number;

  @BelongsTo(() => Motor)
  motor!: Motor;

  @ForeignKey(() => Tires)
  @Column
  tiresId!: number;

  @BelongsTo(() => Tires)
  tires!: Tires;

  @ForeignKey(() => Chassis)
  @Column
  chassisId!: number;

  @BelongsTo(() => Chassis)
  chassis!: Chassis;

  @Column({ type: DataType.INTEGER })
  totalWeight!: number;

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
}
