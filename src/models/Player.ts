import { Table, Model, Column, CreatedAt, UpdatedAt, Unique, DataType, ForeignKey, BelongsTo, HasOne} from "sequelize-typescript";
import { Optional } from "sequelize";
import { Team } from "./Team";

interface PlayerAtributes {
    id: number;
    matricula: string; 
    teamId: number; 
}

interface PlayersCreationAtributes extends Optional<PlayerAtributes, 'id'>{}
@Table({
    tableName: "Players"

  })
export class Player extends Model<PlayerAtributes, PlayersCreationAtributes> {
    @Column({ type:DataType.STRING })
    matricula!: string; 

    @ForeignKey(() => Team)
    @Column
    teamId!: number; 
    @BelongsTo(() => Team, { onDelete: 'CASCADE', as:"playerTeam"})
    playerTeam!: Team; 
  }
  