import React, { FC, useCallback, useContext, useEffect, useState } from 'react';
import {
  Box,
  Button,
  HStack,
  Input,
  Select,
  Stack,
  Text,
  Textarea,
  useDisclosure,
} from '@chakra-ui/react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import 'github-markdown-css/github-markdown.css';
import axios from 'axios';
import { Category } from '../../types/api/Category';
import { SubmitDiaryConfirm } from '../organisms/diary/SubmitDiaryConfirm';
import { CreateCategoryModal } from '../organisms/category/CreateCategoryModal';
import { LoginUser } from '../../App';

export const PostDiary: FC = () => {
  const { targetURL } = useContext(LoginUser);

  const targetDiaryURL: string = targetURL + 'blog_api/diary/';
  const targetCategoryURL: string = targetURL + 'blog_api/category/';

  const [newText, setNewText] = useState('');
  const [newTitle, setNewTitle] = useState('');
  const [newSubTitle, setNewSubTitle] = useState('');
  const [newCategoryId, setNewCategoryId] = useState(0);
  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(true);

  const {
    isOpen: isSubmitDiaryConfirmOpen,
    onOpen: onSubmitDiaryConfirmOpen,
    onClose: onSubmitDiaryConfirmClose,
  } = useDisclosure();
  const {
    isOpen: isCreateCategoryOpen,
    onOpen: onCreateCategoryOpen,
    onClose: onCreateCategoryClose,
  } = useDisclosure();

  const [categories, setCategories] = useState<Array<Category>>([]);

  const reloadCategories = useCallback((targetCategoryURL: string) => {
    axios
      .get<Array<Category>>(targetCategoryURL)
      .then((res) => {
        setCategories(res.data);
      })
      .catch(() => alert('カテゴリが読み込めません'));
  }, []);

  const onClickSubmit = useCallback(
    (title: string, subtitle: string, text: string, category: number) => {
      axios
        .post(targetDiaryURL, {
          title: title,
          subtitle: subtitle,
          text: text,
          category: category,
        })
        .then(() => {
          alert('記事を投稿しました');
          onSubmitDiaryConfirmClose();
        })
        .catch((err) => alert(err));
    },
    [onSubmitDiaryConfirmClose, targetDiaryURL],
  );

  useEffect(() => {
    if (newText && newTitle && newSubTitle && newCategoryId !== 0) {
      setSubmitButtonDisabled(false);
    }
  }, [newCategoryId, newSubTitle, newText, newTitle]);

  useEffect(() => {
    reloadCategories(targetCategoryURL);
  }, [reloadCategories, targetCategoryURL]);

  return (
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
          <Button colorScheme="teal" onClick={onCreateCategoryOpen} minW="140px">
            カテゴリを追加
          </Button>
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
          disabled={submitButtonDisabled}
          onClick={() => onSubmitDiaryConfirmOpen()}
        >
          投稿
        </Button>
      </Box>
      {/* createCategoryModal */}
      <CreateCategoryModal
        isOpen={isCreateCategoryOpen}
        onClose={onCreateCategoryClose}
        targetCategoryURL={targetCategoryURL}
        reloadCategories={reloadCategories}
      />

      {/* submitDiaryModal */}
      <SubmitDiaryConfirm
        title={newTitle}
        subtitle={newSubTitle}
        categoryId={newCategoryId}
        categoryName={
          categories.find((category) => Number(category.id) === newCategoryId)?.name ?? '該当なし'
        }
        text={newText}
        baseURL={targetURL}
        isOpen={isSubmitDiaryConfirmOpen}
        onClickSubmit={onClickSubmit}
        onClose={onSubmitDiaryConfirmClose}
      />
    </Stack>
  );
};
