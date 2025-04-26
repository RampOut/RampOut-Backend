// server.ts o app.ts
import express from 'express';
import { Sequelize } from 'sequelize';
import { initLevelModel } from './models/Level';
import { initStudentModel } from './models/Student';
import { initStudentAnswerModel } from './models/StudentAnswer';
import answersRouter from './routes/answers';

// Crear la instancia de Sequelize
const sequelize = new Sequelize({
  dialect: 'mysql',
  host: 'localhost',
  username: 'root',
  password: '', //! tu contrasenia
  database: 'juego', //! nombre de tu bdd
});

const app = express();
app.use(express.json());

// Inicializar los modelos
initLevelModel(sequelize);
initStudentModel(sequelize);
initStudentAnswerModel(sequelize);

// Definir las rutas
app.use('/answers', answersRouter);

// Sincronizar modelos con la base de datos
sequelize.sync().then(() => {
  console.log('Database synced');
  app.listen(3000, () => {
    console.log('Server running on port 3000');
  });
});
