// utils/Evaluator.ts
export function calculateScore(studentAnswer: number, correctAnswer: number): number {
  const error = Math.abs(studentAnswer - correctAnswer);
  const score = Math.max(0, 100 - error); // Asegúrate de no obtener un puntaje negativo
  return Math.round(score);
}
