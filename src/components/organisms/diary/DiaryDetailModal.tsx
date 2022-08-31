import {
  Box,
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
} from '@chakra-ui/react';
import { FC, useCallback, useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Diary } from '../../../types/api/Diary';

import 'github-markdown-css/github-markdown.css';
import { Category } from '../../../types/api/Category';
import axios from 'axios';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  diary: Diary | null;
  diaries: Array<Diary>;
  setDiaries: (diaries: Array<Diary>) => void;
  categories: Array<Category> | [];
  baseURL: string;
};

export const DiaryDetailModal: FC<Props> = (props) => {
  const { isOpen, onClose, diary, diaries, setDiaries, categories, baseURL } = props;

  const [title, setTitle] = useState('');
  const [subtitle, setSubTitle] = useState('');
  const [text, setText] = useState('');
  const [created_at, setCreated_at] = useState('');

  useEffect(() => {
    setTitle(diary?.title ?? '');
    setSubTitle(diary?.subtitle ?? '');
    setText(diary?.text ?? '');
    setCreated_at(diary?.created_at ?? '');
  }, [diary]);

  const onClickDeletediary = useCallback(() => {
    axios
      .delete(`${baseURL + 'blog_api/diary/'}${diary?.id}/`)
      .then(() => {
        alert(`記事：${diary?.title}を削除しました`);
        const tempDiaries = diaries.filter((c) => c.id !== diary?.id);
        setDiaries(tempDiaries);
        onClose();
      })
      .catch((error) => alert(error));
  }, [baseURL, diaries, diary?.id, diary?.title, onClose, setDiaries]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="4xl">
      <ModalOverlay />
      <ModalContent py={6}>
        <ModalHeader fontSize="3xl" mt={2} mx="auto">
          {title}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Stack>
            <Box mb={10}>
              <Text color={'gray.500'}>{subtitle}</Text>
              <Text color={'gray.500'}>
                カテゴリ：
                {categories.find((category) => category.id === Number(diary?.category) ?? 0)?.name}
              </Text>
              <Text color={'gray.500'}>{created_at}</Text>
            </Box>
            <ReactMarkdown
              className="markdown-body"
              remarkPlugins={[remarkGfm]}
              transformImageUri={(uri) => `${baseURL.slice(0, -1)}${uri}`}
            >
              {text}
            </ReactMarkdown>
          </Stack>
          <Box textAlign="center" p={0}>
            <Button mx={4} my={4} px={8} colorScheme="teal" onClick={() => console.log('putting')}>
              編集
            </Button>
            <Button mx={4} my={4} px={8} colorScheme="red" onClick={onClickDeletediary}>
              削除
            </Button>
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
