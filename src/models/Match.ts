import { Table, Model, Column, DataType, ForeignKey, BelongsTo, HasMany, HasOne } from "sequelize-typescript";
import { Optional } from "sequelize";
import { Team } from "./Team";
import { table } from "console";
import { Host } from "./Host";
import { Level } from "./Level";

interface MatchAttributes {
    id: number; 
    teams?: Team[]; 
    host?: Host; 
    levels?: Level[]; 
}
interface MatchCreationAttributes extends Optional<MatchAttributes, 'id'>{}

@Table({
    tableName: "Match"
})
export class Match extends Model<MatchAttributes, MatchCreationAttributes> {
    @HasMany(() => Team)
    teams?: Team[]; 
   
    @ForeignKey(() => Host)
    @Column 
    hostId!: number; 
    @BelongsTo(() => Host, { onDelete: 'CASCADE', as: "hostedMatch"})
    hostedMatch!: Host;

    @HasMany(() => Level)
    levels?: Level[]; 
}
