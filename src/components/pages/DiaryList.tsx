import { useDisclosure, Wrap, WrapItem } from '@chakra-ui/react';
import axios from 'axios';
import React, { FC, memo, useCallback, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LoginUser } from '../../App';
import { useSelectDiary } from '../../hooks/useSelectDiary';
import { Category } from '../../types/api/Category';
import { Diary } from '../../types/api/Diary';
import { DiaryCard } from '../organisms/diary/DiaryCard';
import { DiaryDetailModal } from '../organisms/diary/DiaryDetailModal';
import { DiaryEditModal } from '../organisms/diary/DiaryEditModal';

export const DiaryList: FC = memo(() => {
  const [newDiary, setNewDiary] = useState<Diary | null>();
  const [diaries, setDiaries] = useState<Array<Diary>>([]);
  const [categories, setCategories] = useState<Array<Category>>([]);
  const { isOpen: isOpenDetail, onOpen: onOpenDetail, onClose: onCloseDetail } = useDisclosure();
  const { isOpen: isOpenEdit, onOpen: onOpenEdit, onClose: onCloseEdit } = useDisclosure();
  const { onSelectDiary, selectedDiary } = useSelectDiary();
  const navigate = useNavigate();

  const { targetURL } = useContext(LoginUser);

  const targetDiaryURL: string = targetURL + 'blog_api/diary/';
  const targetCategoryURL: string = targetURL + 'blog_api/category/';

  const onClickDiary = useCallback(
    (id: number) => {
      onSelectDiary({ id, diaries, onOpenDetail });
      onOpenDetail();
    },
    [onSelectDiary, diaries, onOpenDetail],
  );

  useEffect(() => {
    // 記事取得
    axios
      .get<Array<Diary>>(targetDiaryURL)
      .then((res) => {
        setDiaries(res.data);
      })
      .catch(() => {
        alert('記事が読み込めません');
        navigate('/');
      });

    // カテゴリ取得
    axios
      .get<Array<Category>>(targetCategoryURL)
      .then((res) => {
        setCategories(res.data);
      })
      .catch(() => {
        alert('カテゴリが読み込めません');
        navigate('/');
      });
  }, [navigate, targetCategoryURL, targetDiaryURL]);

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
        setNewDiary={setNewDiary}
        onOpenEdit={onOpenEdit}
        isOpen={isOpenDetail}
        onClose={onCloseDetail}
        diary={selectedDiary ?? null}
        diaries={diaries}
        setDiaries={setDiaries}
        categories={categories}
        baseURL={targetURL}
      />
      <DiaryEditModal
        newDiary={newDiary ?? null}
        isOpen={isOpenEdit}
        onClose={onCloseEdit}
        setDiaries={setDiaries}
        categories={categories}
        targetDiaryURL={targetDiaryURL}
      />
    </>
  );
});
