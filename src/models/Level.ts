import { Table, Model, Column, DataType, ForeignKey, BelongsTo, HasMany } from 'sequelize-typescript';
import { Optional } from 'sequelize';
import { Match } from './Match';
import { Team } from "./Team";
import { Car } from './Car';
import { table } from "console";

interface LevelAttributes {
  id: number;
  name: string;
  description: string;
  expectedAnswer: number;
  gravity: number;
  matchId: number;
  clue: string; 
}


interface LevelCreationAttributes extends Optional<LevelAttributes, 'id'> {}

@Table({
  tableName: 'Levels',
})

export class Level extends Model<LevelAttributes, LevelCreationAttributes> {
    @Column({ type: DataType.STRING })
    name!: string;

    @Column({ type: DataType.TEXT, allowNull: false })
    description!: string;

    @Column({ type: DataType.FLOAT, allowNull: false })
    expectedAnswer!: number;

    @Column({ type: DataType.FLOAT, allowNull: false }) 
    gravedad!: number;

    @ForeignKey(() => Match)
    @Column
    matchId!: number;

    @BelongsTo(() => Match, { onDelete: "CASCADE" })
    match!: Match;

    @HasMany(() => Car)
    cars!: Car[];
}