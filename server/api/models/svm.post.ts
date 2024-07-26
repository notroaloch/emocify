// TODO: MAKE REAL REQUEST TO PYTHON SERVER
export default defineEventHandler(async (event) => {
  const { faceMesh } = await readBody(event);

  let emotion = '';

  try {
    const response: { emotion: string } = await $fetch(
      'https://notroaloch.pythonanywhere.com/api/model/svm',
      {
        method: 'POST',
        body: {
          faceMeshResults: faceMesh,
        },
      }
    );

    switch (response.emotion) {
      case 'angriness':
        emotion = 'ANGRY';
        break;
      case 'sadness':
        emotion = 'SAD';
        break;
      case 'neutralness':
        emotion = 'NEUTRAL';
        break;
      case 'happiness':
        emotion = 'HAPPY';
        break;
      default:
        emotion = 'NEUTRAL';
        break;
    }
  } catch (error) {
    emotion = 'NEUTRAL';
  }

  return { emotion, model: 'SVM' };
});
