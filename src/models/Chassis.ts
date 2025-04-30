import { Table, Model, Column, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Level } from './Level';

interface ChassisAttributes {
  weight: number;              // peoso en kg
  distanceBetweenWheels: number;  // Distancia entre llantas en cm
  height: number;         // Dimensiones [width, height]
  width: number; 
  assets: string[];          //! la imagen
}

@Table({
  tableName: 'chasis'
})
export class Chassis extends Model<ChassisAttributes> {
  @Column({ type: DataType.FLOAT })
  peso!: number;

  @Column({ type: DataType.FLOAT })
  distEntreLLantas!: number;

  @Column({ type: DataType.FLOAT})
  height!: number;

  @Column({ type: DataType.FLOAT})
  width!: number;

  @Column({ type: DataType.JSON })
  assets!: string[];
  
  @ForeignKey(()=> Level)
  @Column
  levelId!: number; 
  
  @BelongsTo(() => Level)
  level!: Level; 
  
}


