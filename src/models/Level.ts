import { Table, Model, Column, DataType, ForeignKey, BelongsTo, HasMany, HasOne } from "sequelize-typescript";
import { Optional } from "sequelize";
import { Team } from "./Team";
import { table } from "console";
import { Match } from "./Match";

interface LevelAttributes {
    id: number, 
    levelVariables: number[]; 
    clue: string; 

    
    // Gravedad, Aceleración, Torque, Peso
    // Tiempo ¿? 
    // ! Empiezo a ver que puede ser necesario guardar la respuesta del jugador como algo distinto.
    
}

interface LevelCreationAttributes extends Optional<LevelAttributes, "id">{}

@Table({
    tableName: "Levels"
})

export class Level extends Model<LevelAttributes, LevelCreationAttributes>{
    @Column({ type: DataType.JSON })
    levelVariables!: number[];  

    @ForeignKey(() => Match)
    @Column
    matchId!: number; 

    @BelongsTo(() => Match, { onDelete: 'CASCADE'})
    match!: Match; 
}