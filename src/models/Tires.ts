import { Table, Model, Column, DataType } from 'sequelize-typescript';

interface TiresAttributes {
  diameter: number;   // diametro en cm
  weight: number;       // peso en kg
  assets: string[];    //! la imagen
}

@Table({
  tableName: 'tires'
})
export class Tires extends Model<TiresAttributes> {
  @Column({ type: DataType.FLOAT })
  diameter!: number;

  @Column({ type: DataType.FLOAT })
  weight!: number;

  @Column({ type: DataType.ARRAY(DataType.STRING) })
  assets!: string[];
}
