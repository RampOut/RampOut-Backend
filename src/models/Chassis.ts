import { Table, Model, Column, DataType, HasMany, BelongsTo , PrimaryKey, AutoIncrement} from 'sequelize-typescript';
import { Level } from './Level';
import { Optional } from 'sequelize';
import { Answer } from './Answer';

interface ChassisAttributes {
  id: number; 
  weight: number;              // peoso en kg
  distanceBetweenWheels: number;  // Distancia entre llantas en cm
  height: number;         // Dimensiones [width, height]
  width: number; 
  assets?: string[];   
  answers?: Answer[]       //! la imagen

}

interface ChassisCreationAttributes extends Optional<ChassisAttributes, 'id'>{}
@Table({
  tableName: 'chasis'
})
export class Chassis extends Model<ChassisAttributes> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id!: number;

  @Column({ type: DataType.FLOAT })
  peso!: number;

  @Column({ type: DataType.FLOAT })
  distanceBetweenWheels!: number;

  @Column({ type: DataType.FLOAT})
  height!: number;

  @Column({ type: DataType.FLOAT})
  width!: number;

  @Column({ type: DataType.JSON })
  assets?: string[];

  @HasMany(() => Answer)
answer?: Answer[];

@Column({ type: DataType.INTEGER })
weight!: number;


  
}


