import { Table, Model, Column, DataType, HasMany, BelongsTo, PrimaryKey } from 'sequelize-typescript';
import { Level } from './Level';
import { Answer } from './Answer';

interface TiresAttributes {
  id: number;         // id de llanta.
  diameter: number;   // diametro en cm
  weight: number;       // peso en kg
  assets?: string[];    //! la imagen
  answers?: Answer[] 
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

  @Column({ type: DataType.JSON})
  assets?: string[];

    @HasMany(() => Answer)
  answers?: Answer[];
  
}
