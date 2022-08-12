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
import { FC, useCallback, useState } from 'react';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  targetCategoryURL: string;
  reloadCategories: (targetCategoryURL: string) => void;
};

export const CreateCategoryModal: FC<Props> = (props) => {
  const { isOpen, onClose, targetCategoryURL, reloadCategories } = props;
  const [newCategory, setNewCategory] = useState('');
  const onClickSubmitCategory = useCallback(
    (newCategory: string) => {
      axios
        .post(targetCategoryURL, { name: newCategory })
        .then(() => {
          alert(`カテゴリ：${newCategory}を作成しました`);
          reloadCategories(targetCategoryURL);
          setNewCategory('');
          onClose();
        })
        .catch((err) => alert(err));
    },
    [onClose, reloadCategories, targetCategoryURL],
  );
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>カテゴリを追加</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl>
            <Input
              type="text"
              onChange={(e) => setNewCategory(e.target.value)}
              value={newCategory}
              placeholder="カテゴリ名を入力"
            />
          </FormControl>
          <Box textAlign="right" p={0}>
            <Button
              mx={2}
              my={2}
              px={8}
              colorScheme="teal"
              onClick={() => onClickSubmitCategory(newCategory)}
            >
              追加
            </Button>
            <Button ml={2} mr={0} my={2} px={8} colorScheme="red" onClick={onClose}>
              キャンセル
            </Button>
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
