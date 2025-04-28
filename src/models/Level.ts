import { Table, Column, Model, DataType, HasMany, ForeignKey, BelongsTo } from "sequelize-typescript";
import { Optional } from "sequelize";
import { Player } from "./Player"; 

interface LevelAttributes {
  id: number;
  name: string;
  description: string;
  expectedAnswer: number;
}

interface LevelCreationAttributes extends Optional<LevelAttributes, 'id'> {}

@Table({
  tableName: "levels",
})
export class Level extends Model<LevelAttributes, LevelCreationAttributes> {

  @Column({ type: DataType.STRING })
  name!: string;

  @Column({ type: DataType.TEXT })
  description!: string;

  @Column({ type: DataType.FLOAT })
  expectedAnswer!: number;

  @HasMany(() => Player)
  players!: Player[];
}
