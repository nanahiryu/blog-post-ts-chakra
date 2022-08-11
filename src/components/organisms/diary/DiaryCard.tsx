import { Box, Stack, Text } from '@chakra-ui/react';
import { memo, FC } from 'react';

type Props = {
  id: number;
  title: string;
  subtitle: string;
  category: string;
  created_at: string;
  onClick: (id: number) => void;
};

export const DiaryCard: FC<Props> = memo((props) => {
  const { id, title, subtitle, category, created_at, onClick } = props;
  return (
    <Box
      w="300px"
      h="200px"
      bg="white"
      borderRadius="10px"
      shadow="md"
      key={id}
      p={4}
      _hover={{ cursor: 'pointer', opacity: 0.8 }}
      onClick={() => onClick(id)}
    >
      <Stack textAlign="center">
        <Text fontSize="lg" fontWeight="bold">
          {title}
        </Text>
        <Text fontSize="sm" color="gray">
          {subtitle}
        </Text>
        <Text fontSize="sm" color="gray">
          カテゴリ：{category}
        </Text>
        <Text fontSize="sm" color="gray">
          {created_at}
        </Text>
      </Stack>
    </Box>
  );
});
