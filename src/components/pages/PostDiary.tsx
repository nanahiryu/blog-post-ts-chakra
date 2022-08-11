import React, { FC, useState } from 'react';
import { Box, Button, Input, Stack, Text, Textarea } from '@chakra-ui/react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import 'github-markdown-css/github-markdown.css';

export const PostDiary: FC = () => {
  const [newText, setNewText] = useState('');
  const [newTitle, setNewTitle] = useState('');
  const [newSubTitle, setNewSubTitle] = useState('');

  const onClickSubmitConfirm = () => {};
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
        <Button w="120px" colorScheme="teal" onClick={() => onClickSubmitConfirm()}>
          投稿
        </Button>
      </Box>
    </Stack>
  );
};
