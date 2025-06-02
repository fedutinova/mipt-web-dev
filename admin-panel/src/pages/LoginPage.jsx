import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box, Button, Input, FormControl, FormLabel, Heading, VStack, useToast
} from '@chakra-ui/react';
import axios from 'axios';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const toast = useToast();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post('http://localhost:8003/admin/login', { username, password });
      localStorage.setItem('token', res.data.access_token);
      navigate('/');
    } catch (err) {
      toast({
        title: 'Ошибка входа',
        description: 'Неверные учетные данные',
        status: 'error',
        duration: 5000,
        isClosable: true
      });
    }
  };

  return (
    <Box maxW="md" mx="auto" mt="20">
      <Heading mb="6" textAlign="center">Вход</Heading>
      <VStack spacing="4">
        <FormControl>
          <FormLabel>Имя пользователя</FormLabel>
          <Input value={username} onChange={(e) => setUsername(e.target.value)} />
        </FormControl>
        <FormControl>
          <FormLabel>Пароль</FormLabel>
          <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </FormControl>
        <Button colorScheme="teal" onClick={handleLogin}>Войти</Button>
      </VStack>
    </Box>
  );
}
