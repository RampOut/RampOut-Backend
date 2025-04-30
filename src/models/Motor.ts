import { Table, Model, Column, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Level } from './Level';
import { Match } from './Match';

interface MotorAttributes {
  power: number;  // Potencia en caballos de fuerza
  rpmMax: number;    // RPM máxima
  weight: number;      // Peso en kg
  assets: string[];      //! la imagen
}

@Table({
  tableName: 'motors'
})
export class Motor extends Model<MotorAttributes> {
  @Column({ type: DataType.FLOAT })
  power!: number;

  @Column({ type: DataType.INTEGER })
  rpmMax!: number;

  @Column({ type: DataType.FLOAT })
  weight!: number;

  @Column({ type: DataType.JSON})
  assets!: string[];

  @ForeignKey(()=> Level)
  @Column
  levelId!: number; 

  @BelongsTo(() => Level)
  level!: Level; 
}
