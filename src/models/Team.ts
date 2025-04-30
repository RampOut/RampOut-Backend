import { Table, Model, Column, DataType, HasMany, ForeignKey, BelongsTo } from "sequelize-typescript";
import { Optional } from "sequelize";
import { Player } from "./Player";
import { Match } from "./Match";
import { StudentAnswer } from './StudentAnswer';

interface TeamAttributes {
  id: number;
  scoreTotal: number;
  StudentAnswer?: number[];
  OrderPlayers?: number[];

  //! Falta ===> answersPerRound: answers; 
}

interface TeamsCreationAtributes extends Optional<TeamAttributes, 'id'>{}

@Table({
  tableName: "Teams"
})
export class Team extends Model<TeamAttributes, TeamsCreationAtributes> {
  @HasMany(() => Player)
  players?: Player[];

  @Column({ type: DataType.INTEGER })
  scoreTotal!: number;

  @ForeignKey(() => Match)
  @Column
  matchId!: number; 

  @BelongsTo(() => Match, { as: "teamMatch"})
  teamMatch!: Match; 

  @HasMany(() => StudentAnswer)
  tires!: StudentAnswer[];

  @Column({ type: DataType.FLOAT })
  OrderPlayers!: number; 
}