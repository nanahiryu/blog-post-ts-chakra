import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  useDisclosure,
  Wrap,
  WrapItem,
} from '@chakra-ui/react';
import React, { FC, memo, useCallback, useContext, useEffect, useState } from 'react';
import { CategoryCard } from '../organisms/category/CategoryCard';

import { Category } from '../../types/api/Category';
import axios from 'axios';
import { CategoryDetailModal } from '../organisms/category/CategoryDetailModal';
import { useSelectCategory } from '../../hooks/useSelectCategory';
import { LoginUser } from '../../App';

export const CategoryList: FC = memo(() => {
  const { targetURL } = useContext(LoginUser);
  const targetURLCategory: string = targetURL + 'blog_api/category/';

  const [categories, setCategories] = useState<Array<Category>>([]);
  const [newCategory, setNewCategory] = useState('');
  const { onSelectCategory, selectedCategory } = useSelectCategory();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const onClickCategory = useCallback(
    (id: number) => {
      onSelectCategory({ id, categories, onOpen });
      onOpen();
    },
    [onOpen, onSelectCategory, categories],
  );

  const onChangeCreateCategory = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewCategory(e.target.value);
  };

  const onClickPostCategory = useCallback(() => {
    axios
      .post(targetURLCategory, { name: newCategory })
      .then((res) => {
        console.log(res.data);
        // 空値埋め
        setNewCategory('');
        // categoriesの更新
        setCategories([...categories, res.data]);
      })
      .catch((error) => console.log(error));
  }, [targetURLCategory, newCategory, categories]);

  useEffect(() => {
    axios
      .get<Array<Category>>(targetURLCategory)
      .then((res) => {
        setCategories(res.data);
      })
      .catch(() => alert('カテゴリが読み込めません'));
  }, [targetURLCategory]);

  return (
    <>
      <Box textAlign="center" justifyContent="center">
        <Flex
          w="80%"
          h="100px"
          bg="white"
          textAlign="center"
          justify="center"
          borderRadius="10px"
          shadow="md"
          p={4}
          mx="auto"
          mt={4}
        >
          <FormControl>
            <FormLabel>カテゴリ新規作成</FormLabel>
            <Box display="flex" alignItems="flex-end">
              <Input type="text" onChange={onChangeCreateCategory} value={newCategory} />
              <Button mx={2} onClick={onClickPostCategory} colorScheme="teal">
                作成
              </Button>
            </Box>
          </FormControl>
        </Flex>
        <Wrap p={{ base: 4, md: 10 }} justify="center">
          {categories.map((category) => (
            <WrapItem mx="auto" key={category.id}>
              <CategoryCard id={category.id} name={category.name} onClick={onClickCategory} />
            </WrapItem>
          ))}
        </Wrap>
        <CategoryDetailModal
          isOpen={isOpen}
          onClose={onClose}
          category={selectedCategory!}
          targetURL={targetURLCategory}
          categories={categories ?? null}
          setCategories={setCategories}
        />
      </Box>
    </>
  );
});
