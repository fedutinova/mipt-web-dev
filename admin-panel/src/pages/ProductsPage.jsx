import { useEffect, useState } from 'react';
import {
  Box, Button, Heading, Input, Stack, Table, Thead, Tbody, Tr, Th, Td, useToast
} from '@chakra-ui/react';
import axios from 'axios';

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({ name: '', description: '', price: '' });
  const toast = useToast();

  const fetchProducts = async () => {
    const res = await axios.get('http://localhost:8001/api/v1/products');
    setProducts(res.data);
  };

  const handleCreate = async () => {
    try {
      await axios.post('http://localhost:8001/api/v1/products', {
        ...newProduct,
        price: parseFloat(newProduct.price)
      });
      toast({ title: 'Товар добавлен', status: 'success' });
      setNewProduct({ name: '', description: '', price: '' });
      fetchProducts();
    } catch (err) {
      toast({ title: 'Ошибка при добавлении', status: 'error' });
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <Box p={6}>
      <Heading mb={4}>Товары</Heading>
      <Stack direction="row" spacing={4} mb={4}>
        <Input
          placeholder="Название"
          value={newProduct.name}
          onChange={e => setNewProduct({ ...newProduct, name: e.target.value })}
        />
        <Input
          placeholder="Описание"
          value={newProduct.description}
          onChange={e => setNewProduct({ ...newProduct, description: e.target.value })}
        />
        <Input
          placeholder="Цена"
          type="number"
          value={newProduct.price}
          onChange={e => setNewProduct({ ...newProduct, price: e.target.value })}
        />
        <Button colorScheme="teal" onClick={handleCreate}>Добавить</Button>
      </Stack>

      <Table>
        <Thead>
          <Tr>
            <Th>ID</Th>
            <Th>Название</Th>
            <Th>Описание</Th>
            <Th>Цена</Th>
          </Tr>
        </Thead>
        <Tbody>
          {products.map(p => (
            <Tr key={p.id}>
              <Td>{p.id}</Td>
              <Td>{p.name}</Td>
              <Td>{p.description}</Td>
              <Td>{p.price}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
}
