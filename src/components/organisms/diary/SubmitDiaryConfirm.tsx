import {
  Box,
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
} from '@chakra-ui/react';
import { FC } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

type Props = {
  title: string;
  subtitle: string;
  categoryId: number;
  categoryName: string;
  text: string;
  baseURL: string;
  isOpen: boolean;
  onClickSubmit: (title: string, subtitle: string, text: string, category: number) => void;
  onClose: () => void;
};

export const SubmitDiaryConfirm: FC<Props> = (props) => {
  const {
    title,
    subtitle,
    categoryId,
    categoryName,
    text,
    baseURL,
    isOpen,
    onClickSubmit,
    onClose,
  } = props;
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} size="4xl">
        <ModalOverlay />
        <ModalContent py={6}>
          <Text ml={4}>以下の内容で投稿してよいですか？</Text>
          <ModalHeader fontSize="3xl" mt={2} mx="auto">
            {title}
          </ModalHeader>
          <ModalBody>
            <Stack>
              <Box mb={10}>
                <Text color={'gray.500'}>{subtitle}</Text>
                <Text color={'gray.500'}>カテゴリ：{categoryName}</Text>
              </Box>
              <ReactMarkdown
                className="markdown-body"
                remarkPlugins={[remarkGfm]}
                transformImageUri={(uri) => `${baseURL.slice(0, -1)}${uri}`}
              >
                {text}
              </ReactMarkdown>
            </Stack>
          </ModalBody>
          <ModalFooter display="flex" justifyContent="center" alignItems="center">
            <Button
              colorScheme="teal"
              m={2}
              onClick={() => onClickSubmit(title, subtitle, text, categoryId)}
            >
              投稿
            </Button>
            <Button colorScheme="red" m={2} onClick={onClose}>
              削除
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
