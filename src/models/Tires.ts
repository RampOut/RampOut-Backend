import { Table, Model, Column, DataType, PrimaryKey } from 'sequelize-typescript';

interface TiresAttributes {
  id: number;         // id de llanta.
  diameter: number;   // diametro en cm
  weight: number;       // peso en kg
  assets: string[];    //! la imagen
}

@Table({
  tableName: 'tires'
})
export class Tires extends Model<TiresAttributes> {
  @PrimaryKey
  @Column({ type: DataType.INTEGER })
  id!: number;

  @Column({ type: DataType.FLOAT })
  diameter!: number;

  @Column({ type: DataType.FLOAT })
  weight!: number;

  @Column({ type: DataType.ARRAY(DataType.STRING) })
  assets!: string[];
}
