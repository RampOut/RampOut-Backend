import { Table, Model, Column, DataType } from 'sequelize-typescript';

interface ChassisAttributes {
  weight: number;              // peoso en kg
  distanceBetweenWheels: number;  // Distancia entre llantas en cm
  dimensions: number[];         // Dimensiones [width, height]
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

  @Column({ type: DataType.ARRAY(DataType.FLOAT) })
  dimensiones!: number[];

  @Column({ type: DataType.ARRAY(DataType.STRING) })
  assets!: string[];
}
