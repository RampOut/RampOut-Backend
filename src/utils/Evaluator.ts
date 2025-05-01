export function calculateScore(studentAnswer: number, correctAnswer: number): number {
    const error = Math.abs(studentAnswer - correctAnswer);
    const score = Math.max(0, 100 - error); 
    return Math.round(score);
  }
  