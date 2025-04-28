import {
  Table,
  Model,
  Column,
  DataType,
  BeforeCreate,
  BeforeUpdate,
  CreatedAt,
  UpdatedAt,
  BelongsToMany,
  BelongsTo,
  HasMany
} from "sequelize-typescript";
import bcrypt from "bcrypt";
import { Match } from "./Match";

@Table({
  tableName: "host",
})
export class Host extends Model {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id!: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true
  })
  username!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password!: string;

  @HasMany(() => Match)
  match?: Match[]; 

  @CreatedAt @Column({ type: DataType.DATE }) Creado!: Date;
  @UpdatedAt @Column({ type: DataType.DATE }) Modificado!: Date;

  // Hook para encriptar la contraseña antes de guardar
  @BeforeCreate
  @BeforeUpdate
  static async hashPassword(instance: Host) {
    if (instance.password) {
      const salt = await bcrypt.genSalt(10); // Generar un salt
      instance.password = await bcrypt.hash(instance.password, salt); // Encriptar la contraseña
    }
  }
}