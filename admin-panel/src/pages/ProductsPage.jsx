import { useEffect, useState } from 'react';
import {
  Box, Button, Heading, Input, Stack, Table, Thead, Tbody, Tr, Th, Td, useToast, Select, FormControl, FormLabel, Flex, Switch
} from '@chakra-ui/react';
import axios from 'axios';
import Header from "../components/Header";

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
    <Box>
      <Header />
      <Box p={6}>
        <Flex justify="space-between" align="center" mb={4}>
          <Heading>Товары</Heading>
          <Button minW="120px" colorScheme="green" onClick={handleCreate}>Добавить</Button>
        </Flex>

        <Table>
          <Thead>
            <Tr>
              <Th>ID</Th>
              <Th>Название</Th>
              <Th>Описание</Th>
              <Th>Цена</Th>
              <Th whiteSpace="nowrap">В наличии</Th>
              <Th>Активен</Th>
            </Tr>
          </Thead>
          <Tbody>
            {products.map(p => (
              <Tr key={p.id}>
                <Td>{p.id}</Td>
                <Td>{p.name}</Td>
                <Td>{p.description}</Td>
                <Td>{p.price}</Td>
                <Td>{p.in_stock}</Td>
                <Td>
                  <Switch isChecked={p.is_active} isReadOnly />
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    </Box>
  );
}
