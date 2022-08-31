import {
  Box,
  Button,
  HStack,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Select,
  Stack,
  Text,
  Textarea,
} from '@chakra-ui/react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Dispatch, FC, SetStateAction, useCallback, useEffect, useState } from 'react';
import { Category } from '../../../types/api/Category';
import { Diary } from '../../../types/api/Diary';
import axios from 'axios';

type Props = {
  newDiary: Diary | null;
  isOpen: boolean;
  onClose: () => void;
  setDiaries: Dispatch<SetStateAction<Array<Diary>>>;
  categories: Array<Category> | [];
  targetDiaryURL: string;
};

export const DiaryEditModal: FC<Props> = (props) => {
  const { newDiary, isOpen, onClose, setDiaries, categories, targetDiaryURL } = props;

  const [newTitle, setNewTitle] = useState(newDiary?.title ?? '');
  const [newSubTitle, setNewSubTitle] = useState(newDiary?.subtitle ?? '');
  const [newText, setNewText] = useState(newDiary?.text ?? '');
  const [newCategoryId, setNewCategoryId] = useState(Number(newDiary?.category));

  const onClickPut = useCallback(
    (id: number, title: string, subtitle: string, text: string, category: number) => {
      if (id === 0) {
        alert('idが設定されていません。');
        return;
      }
      axios
        .put(`${targetDiaryURL}${id}/`, {
          title: title,
          subtitle: subtitle,
          text: text,
          category: category,
        })
        .then((res) => {
          alert('記事を更新しました');
          const responseDiary: Diary = res.data;
          setDiaries((prevDiaries: Array<Diary>) =>
            prevDiaries.map((diary: Diary) => (diary.id === res.data.id ? responseDiary : diary)),
          );
          onClose();
        })
        .catch((err) => alert(err));
    },
    [onClose, setDiaries, targetDiaryURL],
  );

  useEffect(() => {
    setNewTitle(newDiary?.title ?? '');
    setNewSubTitle(newDiary?.subtitle ?? '');
    setNewText(newDiary?.text ?? '');
    setNewCategoryId(Number(newDiary?.category) ?? 0);
  }, [newDiary?.category, newDiary?.subtitle, newDiary?.text, newDiary?.title]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="4xl">
      <ModalOverlay />
      <ModalContent py={6}>
        <ModalCloseButton />
        <ModalBody>
          <Stack w="80%" mx="auto" my={4} spacing={4}>
            <Text fontSize={24}>title</Text>
            <Box bgColor="white" borderRadius={10}>
              <Input value={newTitle} onChange={(e) => setNewTitle(e.target.value)} />
            </Box>
            <Text fontSize={24}>subtitle</Text>
            <Box bgColor="white" borderRadius={10}>
              <Input value={newSubTitle} onChange={(e) => setNewSubTitle(e.target.value)} />
            </Box>
            <Box>
              <Text fontSize={24}>category</Text>
              <HStack mt="1rem">
                <Select
                  bgColor="white"
                  value={newCategoryId}
                  onChange={(e) => setNewCategoryId(Number(e.target.value))}
                >
                  <option value={0}>カテゴリを選択</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </Select>
              </HStack>
            </Box>
            <Text fontSize={24}>text</Text>
            <Box bgColor="white" minH={200} borderRadius={10}>
              <Textarea
                placeholder="write here"
                value={newText}
                minH={200}
                onChange={(e) => setNewText(e.target.value)}
              />
            </Box>
            <Text fontSize={24}>Preview</Text>
            <Box p={4} bgColor="white" minH={100} borderRadius={10} border="solid 3px teal">
              <ReactMarkdown className="markdown-body" remarkPlugins={[remarkGfm]}>
                {newText}
              </ReactMarkdown>
            </Box>
            <Box display="flex" justifyContent="center" alignItems="center">
              <Button
                w="120px"
                colorScheme="teal"
                onClick={() =>
                  onClickPut(newDiary?.id ?? 0, newTitle, newSubTitle, newText, newCategoryId)
                }
              >
                投稿
              </Button>
              <Button mx={4} my={4} px={8} colorScheme="red" onClick={onClose}>
                キャンセル
              </Button>
            </Box>
          </Stack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
