import { Table, Model, Column, DataType , ForeignKey , BelongsTo } from 'sequelize-typescript';
import { Level } from './Level';

interface MotorAttributes {
  power: number;
  rpmMax: number;
  weight: number;
  levelId?: number; 
  assets: string[];  
}

@Table({
  tableName: 'motors',
})
export class Motor extends Model<MotorAttributes> {
  @Column({ type: DataType.FLOAT })
  power!: number;

  @Column({ type: DataType.INTEGER })
  rpmMax!: number;

  @Column({ type: DataType.FLOAT })
  weight!: number;

    @ForeignKey(()=> Level)
    @Column
    levelId?: number; 
    
    @BelongsTo(() => Level)
    level?: Level; 

@Column({ type: DataType.ARRAY(DataType.STRING) })
assets!: string[];

    

}
