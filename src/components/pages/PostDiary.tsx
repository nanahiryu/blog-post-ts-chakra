import React, { FC, useCallback, useEffect, useState } from 'react';
import { Box, Button, Input, Select, Stack, Text, Textarea, useDisclosure } from '@chakra-ui/react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import 'github-markdown-css/github-markdown.css';
import axios from 'axios';
import { Category } from '../../types/api/Category';
import { SubmitDiaryConfirm } from '../organisms/diary/SubmitDiaryConfirm';

export const PostDiary: FC = () => {
  // const baseURL: string = 'https://nanahiryu.com/';
  const baseURL: string = 'http://localhost:8000/';

  const targetDiaryURL: string = baseURL + 'blog_api/diary/';
  const targetCategoryURL: string = baseURL + 'blog_api/category/';

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
  const [categories, setCategories] = useState<Array<Category>>([]);

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
    axios
      .get<Array<Category>>(targetCategoryURL)
      .then((res) => {
        setCategories(res.data);
      })
      .catch(() => alert('カテゴリが読み込めません'));
  }, [targetCategoryURL]);

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
        <Select value={newCategoryId} onChange={(e) => setNewCategoryId(Number(e.target.value))}>
          <option value={0}>カテゴリを選択</option>
          {categories.map((category) => (
            <option value={category.id}>{category.name}</option>
          ))}
        </Select>
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
      <SubmitDiaryConfirm
        title={newTitle}
        subtitle={newSubTitle}
        categoryId={newCategoryId}
        categoryName={
          categories.find((category) => Number(category.id) === newCategoryId)?.name ?? '該当なし'
        }
        text={newText}
        baseURL={baseURL}
        isOpen={isSubmitDiaryConfirmOpen}
        onClickSubmit={onClickSubmit}
        onClose={onSubmitDiaryConfirmClose}
      />
    </Stack>
  );
};
