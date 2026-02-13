function levenshteinDistance(a, b) {
  if (a.length === 0) return b.length;
  if (b.length === 0) return a.length;

  const matrix = [];

  for (let i = 0; i <= b.length; i++) {
    matrix[i] = [i];
  }
  for (let j = 0; j <= a.length; j++) {
    matrix[0][j] = j;
  }

  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      const cost = a[j - 1] === b[i - 1] ? 0 : 1;
      matrix[i][j] = Math.min(
        matrix[i - 1][j] + 1,
        matrix[i][j - 1] + 1,
        matrix[i - 1][j - 1] + cost
      );
    }
  }

  return matrix[b.length][a.length];
}

function normalize(str) {
  return str
    .toLowerCase()
    .trim()
    .replace(/['']/g, "'")
    .replace(/[^a-z0-9\s']/g, "")
    .replace(/\s+/g, " ");
}

export function validateAnswer(userInput, acceptableAnswers) {
  const normalizedInput = normalize(userInput);

  if (!normalizedInput) {
    return { isCorrect: false, closeness: "wrong" };
  }

  for (const answer of acceptableAnswers) {
    const normalizedAnswer = normalize(answer);

    if (normalizedInput === normalizedAnswer) {
      return { isCorrect: true, closeness: "exact" };
    }

    if (
      normalizedInput.includes(normalizedAnswer) ||
      normalizedAnswer.includes(normalizedInput)
    ) {
      return { isCorrect: true, closeness: "exact" };
    }

    const maxDistance = Math.max(1, Math.floor(normalizedAnswer.length * 0.3));
    const distance = levenshteinDistance(normalizedInput, normalizedAnswer);

    if (distance <= maxDistance) {
      return { isCorrect: true, closeness: "close" };
    }
  }

  for (const answer of acceptableAnswers) {
    const normalizedAnswer = normalize(answer);
    const distance = levenshteinDistance(normalizedInput, normalizedAnswer);
    const closeThreshold = Math.max(2, Math.floor(normalizedAnswer.length * 0.5));
    if (distance <= closeThreshold) {
      return { isCorrect: false, closeness: "close" };
    }
  }

  return { isCorrect: false, closeness: "wrong" };
}
