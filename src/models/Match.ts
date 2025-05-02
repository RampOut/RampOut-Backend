import { Table, Model, Column, DataType, ForeignKey, BelongsTo, HasMany, HasOne } from "sequelize-typescript";
import { Optional } from "sequelize";
import { Team } from "./Team";
import { table } from "console";
import { Host } from "./Host";
import { Level } from "./Level";

interface MatchAttributes {
    id: number; 
    teams?: Team[]; 
    hostId: Host; 
    levels?: Level[]; 
    actualLevel?: string; 
    status?: string;
}
interface MatchCreationAttributes extends Optional<MatchAttributes, 'id'>{}

@Table({
    tableName: "Matches"
})
export class Match extends Model<MatchAttributes, MatchCreationAttributes> {
    @Column( DataType.STRING)
    status?: string;

    @HasMany(() => Team)
    teams?: Team[]; 
   
    @ForeignKey(() => Host)
    @Column(DataType.INTEGER)
    hostId!: number; 
    
    @BelongsTo(() => Host, { onDelete: 'CASCADE', as: "hostedMatch"})
    hostedMatch!: Host;

    @HasMany(() => Level)
    levels?: Level[]; 

    @Column({ type: DataType.FLOAT })
    actualLevel?: string; 
}
