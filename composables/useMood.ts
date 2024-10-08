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
    return data;
  };

  const deleteMood = async (id: string) => {
    const ok = await $fetch(`/api/moods/${id}`, {
      method: 'DELETE',
      headers: useRequestHeaders(['cookie']),
    });

    if (ok) {
      const updatedMoods: Mood[] = [];
      moods.value?.forEach((mood) => {
        if (mood.id !== id) {
          updatedMoods.push(mood);
        }
      });
      moods.value = updatedMoods;
    }

    return true;
  };

  const getMoods = async () => {
    const data: Mood[] = await $fetch('/api/moods', {
      method: 'GET',
      headers: useRequestHeaders(['cookie']),
    });

    moods.value = data;
    return data;
  };

  const deleteMoods = async (ids: string[]) => {
    const ok = await $fetch('/api/moods', {
      method: 'DELETE',
      headers: useRequestHeaders(['cookie']),
      query: {
        ids,
      },
    });

    if (ok) {
      const updatedMoods: Mood[] = [];
      moods.value?.forEach((mood) => {
        if (!ids.includes(mood.id!)) {
          updatedMoods.push(mood);
        }
      });
      moods.value = updatedMoods;
    }

    return true;
  };

  const newMoodFromFaceMesh = async (faceMesh: FaceLandmarkerResult) => {
    // GET EMOTION CLASSIFICATION FROM FACE MESH
    const { emotion, model } = await $fetch('/api/models/svm', {
      method: 'POST',
      body: {
        faceMesh,
      },
    });

    const faceLandmarks = faceMesh.faceLandmarks.at(0);
    const faceBlendshapes = faceMesh.faceBlendshapes.at(0)?.categories;
    const faceMatrix = faceMesh.facialTransformationMatrixes.at(0)?.data;

    const mood = <Mood>{
      emotion,
      classifierModel: model,
      faceLandmarks,
      faceBlendshapes,
      faceMatrix,
    };

    // CALL ENDPOINT TO MAKE A NEW MOOD IN DATABASE
    const data: Mood = await $fetch('/api/moods', {
      method: 'POST',
      body: {
        mood,
      },
    });

    // INSERT NEW MOOD IN STATE
    moods.value?.unshift(data);
    currentMood.value = data;

    return data;
  };

  return {
    moods,
    currentMood,
    getMood,
    getMoods,
    deleteMood,
    deleteMoods,
    newMoodFromFaceMesh,
  };
};
