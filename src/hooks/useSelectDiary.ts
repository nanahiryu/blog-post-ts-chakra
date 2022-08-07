import { useCallback, useState } from 'react';
import { Diary } from '../types/api/Diary';

type Props = {
  id: number;
  diaries: Array<Diary>;
  onOpen: () => void;
};

export const useSelectDiary = () => {
  const [selectedDiary, setSelectedDiary] = useState<Diary | null>();
  const onSelectDiary = useCallback((props: Props) => {
    const { id, diaries, onOpen } = props;
    const targetDiary = diaries.find((diary) => diary.id === id);
    setSelectedDiary(targetDiary!);
    onOpen();
  }, []);
  return { onSelectDiary, selectedDiary };
};
