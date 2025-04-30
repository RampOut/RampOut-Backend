import { Table, Model, Column, DataType, ForeignKey, BelongsTo, HasMany } from 'sequelize-typescript';
import { Motor } from './Motor';
import { Tires } from './Tires';
import { Chassis } from './Chassis';
import { Match } from './Match';

interface LevelAttributes {
  id: number;                  // ID del nivel
  description: string;  
  gravity: number;              // Gravedad en el nivel
  motorId: number[];            // Array de Foreign keys para Motor
  tiresId: number[];            // Array de Foreign keys para Tires
  chassisId: number[];           // Array de Foreign keys para Chasis
  matchId: number;      // Foreign key para el Match
  expectedAnswer: number;
}

@Table({
  tableName: 'levels'
})
export class Level extends Model<LevelAttributes> {
  @Column({ type: DataType.FLOAT })
  gravity!: number;             // Variable para la gravedad

  @Column({ type: DataType.TEXT })
  description!: string;  

  @Column({ type: DataType.NUMBER})
  expectedAnswer!: number;

  // Relación de uno a muchos para Motor
  @HasMany(() => Motor)
  motors!: Motor[];

  // Relación de uno a muchos para Tires (Llanta)
  @HasMany(() => Tires)
  tires!: Tires[];

  // Relación de uno a muchos para Chasis
  @HasMany(() => Chassis)
  chasis!: Chassis[];

  // Foreign key para Match
  @ForeignKey(() => Match)
  @Column({ type: DataType.INTEGER })
  matchId!: number;

  @BelongsTo(() => Match, { onDelete: 'CASCADE' })
  match!: Match;
}
