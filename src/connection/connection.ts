import { Sequelize } from "sequelize-typescript";
import { Player } from "../models/Player";
import { Team } from "../models/Team";


export const connection = new Sequelize({
database: 'rampOut',
dialect: "mysql",
username: 'root',
password: '1234',
storage: ':memory:',
models: [
Player, 
Team
]
});

async function connectionDB(){
    try {
      await connection.sync();
      console.log('Base de datos conectada y sincronizada');
    } catch (e) {
      console.error('Error al conectar la base de datos:', e);
      throw e;  
    }
  }
  

export default connectionDB;