import { Sequelize } from "sequelize-typescript";
import { Player } from "../models/Player";

export const connection = new Sequelize({
    database: 'rampOut', 
    dialect: 'mysql',
    username: 'root', 
    password: '1234', 
    storage: ':memory:',
    models: [
        Player
    ],
});

async function connectionDB() {
try{
    await connection.sync(); 
}catch(e){
    console.log(e);
}
}

export default connectionDB;