import { InfoOutlineIcon } from '@chakra-ui/icons';
import { Flex, HStack, Text } from '@chakra-ui/react';
import React, { FC } from 'react';

type Props = {
  id: number;
  name: string;
  onClick: (id: number) => void;
};

export const CategoryCard: FC<Props> = (props) => {
  const { id, name, onClick } = props;

  return (
    <Flex
      w="300px"
      h="60px"
      bg="white"
      textAlign="left"
      justify="flex-start"
      borderRadius="10px"
      shadow="md"
      key={id}
      p={4}
      m={2}
      _hover={{ cursor: 'pointer', opacity: 0.8 }}
      onClick={() => onClick(id)}
    >
      <HStack>
        <InfoOutlineIcon />
        <Text fontSize="lg" fontWeight="bold">
          {name}
        </Text>
      </HStack>
    </Flex>
  );
};
