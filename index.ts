import { Level } from './models/Level';
import { Student } from './models/Student';
import { StudentAnswer } from './models/StudentAnswer';

// Relaciones entre modelos
Level.hasMany(StudentAnswer, { foreignKey: 'levelId' });
StudentAnswer.belongsTo(Level, { foreignKey: 'levelId' });

Student.hasMany(StudentAnswer, { foreignKey: 'studentId' });
StudentAnswer.belongsTo(Student, { foreignKey: 'studentId' });
