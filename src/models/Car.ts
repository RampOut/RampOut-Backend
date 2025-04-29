import { Table, Model, Column, DataType, ForeignKey, BelongsTo } from "sequelize-typescript";
import { Optional } from "sequelize";
import { Level } from "./Level";

interface CarAttributes {
  id: number;
  name: string;
  weight: number; // Peso del coche
  maxSpeed: number; // Velocidad máxima
  maxAcceleration: number; // Aceleración máxima
  torque: number; // Torque
  levelId: number; // Nivel con el que se asocia el coche
}
// Atributos para la creación de una instancia de Car
interface CarCreationAttributes extends Optional<CarAttributes, 'id'> {}

@Table({
  tableName: "Cars",
})
export class Car extends Model<CarAttributes, CarCreationAttributes> {

  @Column({ type: DataType.STRING })
  name!: string; 
  
  @Column({ type: DataType.FLOAT })
  weight!: number; 
  
  @Column({ type: DataType.FLOAT })
  maxSpeed!: number; 
  
  @Column({ type: DataType.FLOAT })
  maxAcceleration!: number; 
  
  @Column({ type: DataType.FLOAT })
  torque!: number; 

  // Relación con el modelo Level
  @ForeignKey(() => Level)
  @Column
  levelId!: number; // Relación con el nivel al que pertenece el coche

  @BelongsTo(() => Level)
  level!: Level; // Relación inversa con Level
}
