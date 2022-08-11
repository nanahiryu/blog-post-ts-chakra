import { Box, Flex, Heading, Link, useDisclosure } from '@chakra-ui/react';
import { memo, FC, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { MenuIconButton } from '../../atoms/button/MenuIconButton';
import { MenuDrawer } from '../../molecules/MenuDrawer';

export const Header: FC = memo(() => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();

  const onClickDiaryList = useCallback(() => navigate('/diary'), [navigate]);
  const onClickCategoryList = useCallback(() => navigate('/category'), [navigate]);
  const onClickDiaryPost = useCallback(() => navigate('/'), [navigate]);

  return (
    <>
      <Flex
        as="nav"
        bg="teal.500"
        color="gray.50"
        align="center"
        justify="space-between"
        padding={{ base: 3, md: 5 }}
      >
        <Flex
          align="center"
          as="a"
          mr={8}
          _hover={{ cursor: 'pointer' }}
          onClick={onClickDiaryList}
        >
          <Heading as="h1" fontSize={{ base: 'md', md: 'lg' }}>
            ブログ記事投稿アプリ
          </Heading>
        </Flex>
        <Flex align="center" fontSize="sm" flexGrow={2} display={{ base: 'none', md: 'flex' }}>
          <Box pr={4}>
            <Link onClick={onClickDiaryList}>記事一覧</Link>
          </Box>
          <Box pr={4}>
            <Link onClick={onClickCategoryList}>カテゴリ一覧</Link>
          </Box>
          <Box pr={4}>
            <Link onClick={onClickDiaryPost}>記事投稿</Link>
          </Box>
        </Flex>
        <MenuIconButton onOpen={onOpen} />
      </Flex>
      <MenuDrawer
        onClose={onClose}
        isOpen={isOpen}
        onClickDiaryList={onClickDiaryList}
        onClickCategoryList={onClickCategoryList}
        onClickDiaryPost={onClickDiaryPost}
      />
    </>
  );
});
