import { Flex } from '@chakra-ui/react';
import { FC, memo } from 'react';
import { Outlet, Route, Routes } from 'react-router-dom';
import { CategoryList } from '../components/pages/CategoryList';
import { DiaryList } from '../components/pages/DiaryList';
import { PostDiary } from '../components/pages/PostDiary';
import { HeaderLayout } from '../components/templates/HeaderLayout';

export const Router: FC = memo(() => {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <HeaderLayout>
              <Flex backgroundColor="gray.200" h="100%" minH="100vh">
                <Outlet />
              </Flex>
            </HeaderLayout>
          }
        >
          <Route index element={<PostDiary />} />
          <Route path="diary" element={<DiaryList />} />
          <Route path="category" element={<CategoryList />} />
        </Route>
      </Routes>
    </>
  );
});
