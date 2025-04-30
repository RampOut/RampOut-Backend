import { Table, Model, Column, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Level } from './Level';
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

  @Column({ type: DataType.JSON})
  assets!: string[];

  @ForeignKey(()=> Level)
  @Column
  levelId!: number; 
  
  @BelongsTo(() => Level)
  level!: Level; 
}
