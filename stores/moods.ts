export const useMoodStore = defineStore('moodStore', () => {
  const moods: Ref<Mood[] | undefined> = useState('moodStore-moods');
  const currentMood: Ref<Mood | undefined> = useState('moodStore-currentMood');

  return { moods, currentMood };
});
