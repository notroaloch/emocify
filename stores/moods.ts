export const useMoodStore = defineStore('mood', () => {
  const moods: Ref<Mood[] | undefined> = useState('mood-moods');
  const currentMood: Ref<Mood | undefined> = useState('mood-currentMood');

  return { moods, currentMood };
});
