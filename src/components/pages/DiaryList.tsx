import { useDisclosure, Wrap, WrapItem } from '@chakra-ui/react';
import axios from 'axios';
import React, { FC, memo, useCallback, useContext, useEffect, useState } from 'react';
import { LoginUser } from '../../App';
import { useSelectDiary } from '../../hooks/useSelectDiary';
import { Category } from '../../types/api/Category';
import { Diary } from '../../types/api/Diary';
import { DiaryCard } from '../organisms/diary/DiaryCard';
import { DiaryDetailModal } from '../organisms/diary/DiaryDetailModal';

export const DiaryList: FC = memo(() => {
  const [diaries, setDiaries] = useState<Array<Diary>>([]);
  const [categories, setCategories] = useState<Array<Category>>([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { onSelectDiary, selectedDiary } = useSelectDiary();

  const { targetURL } = useContext(LoginUser);

  const targetDiaryURL: string = targetURL + 'blog_api/diary/';
  const targetCategoryURL: string = targetURL + 'blog_api/category/';

  const onClickDiary = useCallback(
    (id: number) => {
      onSelectDiary({ id, diaries, onOpen });
      onOpen();
    },
    [onOpen, onSelectDiary, diaries],
  );

  useEffect(() => {
    // 記事取得
    axios
      .get<Array<Diary>>(targetDiaryURL)
      .then((res) => {
        setDiaries(res.data);
      })
      .catch(() => alert('記事が読み込めません'));

    // カテゴリ取得
    axios
      .get<Array<Category>>(targetCategoryURL)
      .then((res) => {
        setCategories(res.data);
      })
      .catch(() => alert('カテゴリが読み込めません'));
  }, [targetCategoryURL, targetDiaryURL]);

  return (
    <>
      <Wrap p={{ base: 4, md: 10 }} justify="center">
        {diaries.map((diary) => (
          <WrapItem mx="auto" key={diary.id}>
            <DiaryCard
              id={diary.id}
              title={diary.title}
              subtitle={diary.subtitle}
              category={
                categories.find((category) => category.id === Number(diary.category))?.name ??
                '該当なし'
              }
              created_at={diary.created_at}
              onClick={onClickDiary}
            />
          </WrapItem>
        ))}
      </Wrap>
      <DiaryDetailModal
        isOpen={isOpen}
        onClose={onClose}
        diary={selectedDiary ?? null}
        categories={categories}
        baseURL={targetURL}
      />
    </>
  );
});
