import type { FaceLandmarkerResult } from '@mediapipe/tasks-vision';

export const useMood = () => {
  const moodStore = useMoodStore();
  const { moods, currentMood } = storeToRefs(moodStore);

  const getMood = async (id: string) => {
    const data = await $fetch(`/api/moods/${id}`, {
      method: 'GET',
      headers: useRequestHeaders(['cookie']),
    });

    currentMood.value = data;
    return currentMood.value;
  };

  const getMoods = async () => {
    const data = await $fetch('/api/moods', {
      method: 'GET',
      headers: useRequestHeaders(['cookie']),
    });

    moods.value = data;
    return moods.value;
  };

  const newMoodFromFaceMesh = async (faceMesh: FaceLandmarkerResult) => {
    // GET EMOTION CLASSIFICATION FROM FACE MESH
    const { emotion, model } = await $fetch('/api/models/svm', {
      method: 'POST',
      body: {
        faceMesh,
      },
    });

    // CALL ENDPOINT TO MAKE A NEW MOOD IN DATABASE
    const mood: Mood = await $fetch('/api/moods', {
      method: 'POST',
      body: {
        emotion,
        model,
        faceMesh,
      },
    });

    // INSERT NEW MOOD IN STATE
    moods.value?.push(mood);
    currentMood.value = mood;

    return currentMood.value;
  };

  return {
    moods,
    currentMood,
    getMood,
    getMoods,
    newMoodFromFaceMesh,
  };
};
