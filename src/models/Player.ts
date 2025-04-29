import { Table, Model, Column, CreatedAt, UpdatedAt, Unique, DataType, ForeignKey, BelongsTo, HasOne } from "sequelize-typescript";
import { Optional } from "sequelize";
import { Team } from "./Team";
import { Match } from "./Match";
import { Level } from "./Level";
import { Car } from "./Car";

interface PlayerAtributes {
    id: number;
    firstName: string; 
    lastName: string; 
    matricula: string; 
    teamId: number; 
    levelId: number;
    score: number;
}

interface PlayersCreationAttributes extends Optional<PlayerAtributes, 'id'> {}

@Table({
    tableName: "Players"
  })

  export class Player extends Model<PlayerAtributes, PlayersCreationAttributes> {
    @Column({ type: DataType.STRING })
    firstName!: string;
  
    @Column({ type: DataType.STRING })
    lastName!: string;
  
    @Column({ type: DataType.STRING })
    matricula!: string;
    @ForeignKey(() => Team)
    @Column
    teamId!: number;
  
    @BelongsTo(() => Team)
    team!: Team;
  
    @ForeignKey(() => Level)
    @Column
    levelId!: number;
  
    @BelongsTo(() => Level)
    level!: Level;
  
    @Column({ type: DataType.INTEGER, defaultValue: 0 })
    score!: number;
  
    @ForeignKey(() => Match)
    @Column
    matchId!: number;
  
    @BelongsTo(() => Match)
    match!: Match;

    @BelongsTo(() => Team, { onDelete: 'CASCADE', as:"playerTeam"})
    playerTeam!: Team; 
  }
  