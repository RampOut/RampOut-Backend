import { Table, Model, Column, DataType } from 'sequelize-typescript';

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

  @Column({ type: DataType.ARRAY(DataType.STRING) })
  assets!: string[];
}
