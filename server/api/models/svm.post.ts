// TODO: MAKE REAL REQUEST TO PYTHON SERVER

export default defineEventHandler(async (event) => {
  const { faceMesh } = await readBody(event);

  const emotions = ['ANGRY', 'SAD', 'NEUTRAL', 'HAPPY'];
  const emotion = emotions[Math.floor(Math.random() * emotions.length)];

  return { emotion, model: 'SVM' };
});
