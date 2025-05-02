import { Table, Model, Column, DataType , HasMany , BelongsTo } from 'sequelize-typescript';
import { Level } from './Level';
import { Answer } from './Answer';

interface MotorAttributes {
  power: number;
  rpmMax: number;
  weight: number;
  assets?: string[];  
  answers?: Answer[]
}

@Table({
  tableName: 'motors',
})
export class Motor extends Model<MotorAttributes> {

  @Column({

    type: DataType.INTEGER,
    primaryKey: true, 
    autoIncrement: true, 
    })
    
    id!: number;

    
  @Column({ type: DataType.FLOAT })
  power!: number;

  @Column({ type: DataType.INTEGER })
  rpmMax!: number;

  @Column({ type: DataType.FLOAT })
  weight!: number;


@Column({ type: DataType.JSON})
assets?: string[];

@HasMany(() => Answer)
answers?: Answer[];

    

}

