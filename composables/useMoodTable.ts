export const useMoodTable = () => {
  const { moods } = useMood();

  const page: Ref<number> = useState('useMoodTable-page', () => 1);
  const pageCount: number = 10;
  const selected: Ref<Mood[]> = useState('useMoodTable-selected', () => []);
  const rows: Ref<Mood[]> = computed(() => {
    return moodsSafe
      .value!.map((mood) => {
        return {
          ...mood,
          shortID: getMoodShortID(mood.id!),
          createdAtFormatted: getFormattedDate(mood.createdAt!),
        };
      })
      .slice((page.value - 1) * pageCount, page.value * pageCount);
  });

  const moodsSafe: Ref<Mood[]> = computed(() => {
    if (!moods.value) return [];
    return moods.value;
  });

  const columns = [
    { key: 'shortID', label: 'ID' },
    { key: 'emotion', label: 'Emoción', sortable: true },
    { key: 'classifierModel', label: 'Modelo' },
    { key: 'createdAtFormatted', label: 'Fecha', sortable: true },
    { key: 'actions' },
  ];

  return { selected, rows, columns, page, pageCount, moods: moodsSafe };
};
