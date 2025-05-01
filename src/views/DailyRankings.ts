//Esta es una vista, no un modelo (por eso no tiene id)

import { Table, Column, Model, DataType } from "sequelize-typescript";

@Table({
    tableName: 'daily_rankings',
    timestamps: false,
})

export class GlobalRanking extends Model {
//Columnas abajo
@Column({ type: DataType.STRING })
matricula!: number; 

@Column({ type: DataType.NUMBER})
scoreTotal!: number; 
}; 
