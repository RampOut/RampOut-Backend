import { Table, Model, Column, DataType, HasMany, ForeignKey, BelongsTo } from "sequelize-typescript";
import { Optional } from "sequelize";
import { Player } from "./Player";
import { Match } from "./Match";

interface TeamAttributes {
  id: number;
  scoreTotal: number;
  scorePerRound: number[];
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

  @Column({ type: DataType.JSON })
  scorePerRound!: number[];  

  @ForeignKey(() => Match)
  @Column
  matchId!: number; 

  @BelongsTo(() => Match, { as: "teamMatch"})
  teamMatch!: Match; 
}
