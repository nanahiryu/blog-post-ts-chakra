import { useCallback, useState } from 'react';
import { Diary } from '../types/api/Diary';

type Props = {
  id: number;
  diaries: Array<Diary>;
  onOpenDetail: () => void;
};

export const useSelectDiary = () => {
  const [selectedDiary, setSelectedDiary] = useState<Diary | null>();
  const onSelectDiary = useCallback((props: Props) => {
    const { id, diaries, onOpenDetail } = props;
    const targetDiary = diaries.find((diary) => diary.id === id);
    setSelectedDiary(targetDiary!);
    onOpenDetail();
  }, []);
  return { onSelectDiary, selectedDiary };
};
