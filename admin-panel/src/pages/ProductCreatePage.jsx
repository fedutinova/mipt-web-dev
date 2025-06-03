import { useState } from 'react';
import {
  Box, Button, Heading, Input, Stack, useToast, FormControl, FormLabel
} from '@chakra-ui/react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';

export function ProductCreatePage() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [inStock, setInStock] = useState('');
  const toast = useToast();
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      await axios.post('http://localhost:8001/api/v1/products', {
        name,
        description,
        price: parseFloat(price),
        in_stock: parseInt(inStock, 10)
      });
      toast({ title: 'Товар добавлен', status: 'success' });
      navigate('/products');
    } catch (err) {
      toast({ title: 'Ошибка добавления', status: 'error' });
    }
  };

  return (
    <Box>
      <Header />
      <Box maxW="md" mx="auto" mt={10} p={6} borderWidth={1} borderRadius="lg">
        <Heading mb={6}>Добавить товар</Heading>
        <Stack spacing={4}>
          <FormControl>
            <FormLabel>Название</FormLabel>
            <Input value={name} onChange={e => setName(e.target.value)} />
          </FormControl>
          <FormControl>
            <FormLabel>Описание</FormLabel>
            <Input value={description} onChange={e => setDescription(e.target.value)} />
          </FormControl>
          <FormControl>
            <FormLabel>Цена</FormLabel>
            <Input type="number" value={price} onChange={e => setPrice(e.target.value)} />
          </FormControl>
          <FormControl>
            <FormLabel>Количество</FormLabel>
            <Input type="number" value={inStock} onChange={e => setInStock(e.target.value)} />
          </FormControl>
          <Button colorScheme="teal" onClick={handleSubmit}>Сохранить</Button>
        </Stack>
      </Box>
    </Box>
  );
}
