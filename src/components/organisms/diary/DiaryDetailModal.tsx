import {
  Box,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
} from '@chakra-ui/react';
import { FC, useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Diary } from '../../../types/api/Diary';

import 'github-markdown-css/github-markdown.css';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  diary: Diary | null;
};

export const DiaryDetailModal: FC<Props> = (props) => {
  const { isOpen, onClose, diary } = props;

  const [title, setTitle] = useState('');
  const [subtitle, setSubTitle] = useState('');
  const [text, setText] = useState('');
  const [created_at, setCreated_at] = useState('');
  const [category, setCategory] = useState('');

  useEffect(() => {
    setTitle(diary?.title ?? '');
    setSubTitle(diary?.subtitle ?? '');
    setText(diary?.text ?? '');
    setCreated_at(diary?.created_at ?? '');
    setCategory(diary?.category ?? '');
  }, [diary]);

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
              <Text color={'gray.500'}>カテゴリ：{category}</Text>
              <Text color={'gray.500'}>{created_at}</Text>
            </Box>
            <ReactMarkdown className="markdown-body" remarkPlugins={[remarkGfm]}>
              {text}
            </ReactMarkdown>
          </Stack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
