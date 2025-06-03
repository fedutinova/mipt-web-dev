import { useEffect, useState } from 'react';
import {
  Box, Button, Heading, Input, Stack, Textarea, Thead, Tbody, Tr, Th, Td, useToast, Select, FormControl, FormLabel, Flex, Switch, Text
} from '@chakra-ui/react';
import axios from 'axios';
import { useNavigate, useParams, Link } from 'react-router-dom';
import Header from '../components/Header';

export function ProductEditPage() {
  const { id } = useParams();
  const [form, setForm] = useState({ name: '', description: '', price: '', in_stock: '' });
  const toast = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      const res = await axios.get(`http://localhost:8001/api/v1/products/${id}`);
      setForm(res.data);
    };
    fetchProduct();
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      await axios.post(`http://localhost:8001/api/v1/products/${id}`, {
        ...form,
        price: parseFloat(form.price),
        in_stock: parseInt(form.in_stock)
      });
      toast({ title: 'Товар обновлен', status: 'success' });
      navigate('/products');
    } catch (err) {
      toast({ title: 'Ошибка обновления', status: 'error' });
    }
  };

  return (
    <Box>
        <Header />
    <Box maxW="md" mx="auto" mt={10} p={6}>
      <Heading mb={6}>Редактировать товар</Heading>
      <Stack spacing={4}>
        <FormControl>
          <FormLabel>Название</FormLabel>
          <Input name="name" value={form.name} onChange={handleChange} />
        </FormControl>
        <FormControl>
          <FormLabel>Описание</FormLabel>
          <Textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            minHeight="120px"
          />
        </FormControl>
        <FormControl>
          <FormLabel>Цена</FormLabel>
          <Input name="price" value={form.price} onChange={handleChange} type="number" />
        </FormControl>
        <FormControl>
          <FormLabel>В наличии</FormLabel>
          <Input name="in_stock" value={form.in_stock} onChange={handleChange} type="number" />
        </FormControl>
        <Button colorScheme="teal" onClick={handleSubmit}>Сохранить</Button>
      </Stack>
    </Box>
    </Box>
  );
}
