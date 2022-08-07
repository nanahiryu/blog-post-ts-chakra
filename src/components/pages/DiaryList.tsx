import { useDisclosure, Wrap, WrapItem } from '@chakra-ui/react';
import axios from 'axios';
import React, { FC, memo, useCallback, useEffect, useState } from 'react';
import { useSelectDiary } from '../../hooks/useSelectDiary';
import { Diary } from '../../types/api/Diary';
import { DiaryCard } from '../organisms/diary/DiaryCard';
import { DiaryDetailModal } from '../organisms/diary/DiaryDetailModal';

export const DiaryList: FC = memo(() => {
  const [diaries, setDiaries] = useState<Array<Diary>>([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { onSelectDiary, selectedDiary } = useSelectDiary();

  const targetURL: string = 'https://nanahiryu.com/blog_api/diary/';
  // const targetURL: string = 'http://localhost:8000/blog_api/diary/';

  const onClickDiary = useCallback(
    (id: number) => {
      onSelectDiary({ id, diaries, onOpen });
      onOpen();
    },
    [onOpen, onSelectDiary, diaries],
  );

  useEffect(() => {
    const getDiaries = () => {
      axios
        .get<Array<Diary>>(targetURL)
        .then((res) => {
          setDiaries(res.data);
        })
        .catch(() => alert('記事が読み込めません'));
    };

    getDiaries();
  }, []);

  return (
    <>
      <Wrap p={{ base: 4, md: 10 }} justify="center">
        {diaries.map((diary) => (
          <WrapItem mx="auto" key={diary.id}>
            <DiaryCard
              id={diary.id}
              title={diary.title}
              subtitle={diary.subtitle}
              category={diary.category}
              created_at={diary.created_at}
              onClick={onClickDiary}
            />
          </WrapItem>
        ))}
      </Wrap>
      <DiaryDetailModal isOpen={isOpen} onClose={onClose} diary={selectedDiary ?? null} />
    </>
  );
});
