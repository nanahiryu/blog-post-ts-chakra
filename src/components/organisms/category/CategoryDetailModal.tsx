import {
  Box,
  Button,
  FormControl,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react';
import axios from 'axios';
import { FC, useCallback, useEffect, useState } from 'react';
import { Category } from '../../../types/api/Category';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  category: Category | null;
  targetURL: string;
  categories: Array<Category>;
  setCategories: (categories: Array<Category>) => void;
};

export const CategoryDetailModal: FC<Props> = (props) => {
  const { isOpen, onClose, category, targetURL, categories, setCategories } = props;
  const [modifiedCategory, setModifiedCategory] = useState('');
  const [name, setName] = useState('');

  const onClickPut = useCallback(() => {
    axios
      .put(`${targetURL}${category?.id}/`, { name: modifiedCategory })
      .then((res) => {
        // alertの表示
        alert(res.data);
        // 入力画面を空値に
        setModifiedCategory('');
        // Modal閉じる
        onClose();
        // categoriesの更新
        const tempIndex = categories.findIndex((c) => c.id === category?.id);
        const tempCategory = categories.find(({ id }) => id === category?.id)!;
        tempCategory.name = modifiedCategory;
        categories[tempIndex] = tempCategory;
        setCategories(categories);
      })
      .catch((error) => alert(error));
  }, [category?.id, modifiedCategory, targetURL, onClose, categories, setCategories]);

  const onClickDelete = useCallback(() => {
    axios
      .delete(`${targetURL}${category?.id}/`)
      .then(() => {
        alert(`カテゴリ：${category?.name}を削除しました`);
        const tempCategories = categories.filter((c) => c.id !== category?.id);
        setCategories(tempCategories);
        onClose();
      })
      .catch((error) => alert(error));
  }, [categories, category?.id, category?.name, onClose, setCategories, targetURL]);

  useEffect(() => {
    setName(category?.name ?? '');
  }, [category]);

  const onChangeRename = (e: React.ChangeEvent<HTMLInputElement>) => {
    setModifiedCategory(e.target.value);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{name}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl>
            <Input
              type="text"
              onChange={onChangeRename}
              value={modifiedCategory}
              placeholder="変更後のカテゴリ名を入力"
            />
          </FormControl>
          <Box textAlign="right" p={0}>
            <Button mx={2} my={2} px={8} colorScheme="teal" onClick={onClickPut}>
              変更
            </Button>
            <Button ml={2} mr={0} my={2} px={8} colorScheme="red" onClick={onClickDelete}>
              削除
            </Button>
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
