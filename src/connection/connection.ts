/*import { Sequelize } from "sequelize-typescript";
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

export default connectionDB;*/

import { Sequelize } from "sequelize-typescript";
import { Player } from "../models/Player";
import { Team } from "../models/Team";

export const connection = new Sequelize({
    database: 'rampout', 
    dialect: 'mysql',
    username: 'ramp_user', 
    password: '1234', 
    storage: ':memory:',
    models: [
        Player, Team
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