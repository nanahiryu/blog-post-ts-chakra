import { Button, Drawer, DrawerBody, DrawerContent, DrawerOverlay } from '@chakra-ui/react';
import { memo, FC } from 'react';

type Props = {
  onClose: () => void;
  isOpen: boolean;
  onClickDiaryList: () => void;
  onClickCategoryList: () => void;
  onClickDiaryPost: () => void;
};

export const MenuDrawer: FC<Props> = memo((props) => {
  const { onClose, isOpen, onClickDiaryList, onClickCategoryList, onClickDiaryPost } = props;
  return (
    <Drawer placement="left" size="xs" onClose={onClose} isOpen={isOpen}>
      <DrawerOverlay>
        <DrawerContent>
          <DrawerBody p={0} bg="gray.100">
            <Button w="100%" onClick={onClickDiaryList}>
              記事一覧
            </Button>
            <Button w="100%" onClick={onClickCategoryList}>
              カテゴリ一覧
            </Button>
            <Button w="100%" onClick={onClickDiaryPost}>
              記事投稿
            </Button>
          </DrawerBody>
        </DrawerContent>
      </DrawerOverlay>
    </Drawer>
  );
});
