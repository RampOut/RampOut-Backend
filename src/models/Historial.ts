import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Team } from './Team'; // Importamos el modelo de Team

interface HistorialAttributes {
  id: number;
  teamId: number;
  playerId: number;
  roundScore: number;
  scoreTotal: number;
  motorId: number;
  tiresId: number;
  chassisId: number;
  levelId: number;
  createdAt: Date;
  updatedAt: Date;
}

@Table({
  tableName: 'historiales',
  timestamps: true,
})
export class Historial extends Model<HistorialAttributes> {
  @ForeignKey(() => Team)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  teamId!: number;  // Aquí agregamos el '!' para indicar que este campo se inicializa después

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  playerId!: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  roundScore!: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  scoreTotal!: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  motorId!: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  tiresId!: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  chassisId!: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  levelId!: number;

  @BelongsTo(() => Team)
  team!: Team;  // Aquí también se indica que tiene una relación con 'Team'
}
