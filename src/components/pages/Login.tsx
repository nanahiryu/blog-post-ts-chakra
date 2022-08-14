import { Heading, Box, Center, Text, Stack, Button, useColorModeValue } from '@chakra-ui/react';
import { FC, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { LoginUser } from '../../App';

export const Login: FC = () => {
  const { setTargetURL } = useContext(LoginUser);
  const navigate = useNavigate();

  const onClickLogin = (url: string) => {
    setTargetURL(url);
    navigate('/diary');
  };

  return (
    <Center py={6} mt={6}>
      <Box
        maxW={'480px'}
        w={'full'}
        bg={useColorModeValue('white', 'gray.900')}
        boxShadow={'2xl'}
        rounded={'lg'}
        p={12}
        mt={12}
        textAlign={'center'}
      >
        <Heading fontSize={'2xl'} fontFamily={'body'}>
          ログイン
        </Heading>

        <Text textAlign={'center'} color={useColorModeValue('gray.700', 'gray.400')} px={3} py={4}>
          接続先を選択してください
        </Text>

        <Stack mt={8} direction={'row'} spacing={4}>
          <Button
            flex={1}
            fontSize={'lg'}
            rounded={'full'}
            _focus={{
              bg: 'gray.200',
            }}
            onClick={() => onClickLogin('https://nanahiryu.com/')}
          >
            本番
          </Button>
          <Button
            flex={1}
            fontSize={'lg'}
            rounded={'full'}
            bg={'blue.400'}
            color={'white'}
            boxShadow={
              '0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)'
            }
            _hover={{
              bg: 'blue.500',
            }}
            _focus={{
              bg: 'blue.500',
            }}
            onClick={() => onClickLogin('http://localhost:8000/')}
          >
            検証
          </Button>
        </Stack>
      </Box>
    </Center>
  );
};
