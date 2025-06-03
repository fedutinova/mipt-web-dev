import { useEffect, useState } from 'react';
import {
  Box, Button, Heading, Table, Thead, Tbody, Tr, Th, Td, Flex, Switch
} from '@chakra-ui/react';
import axios from 'axios';
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  const fetchProducts = async () => {
    const res = await axios.get('http://localhost:8001/api/v1/products');
    setProducts(res.data);
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
          <Button minW="120px" colorScheme="green" onClick={() => navigate("/products/new")}>Добавить</Button>
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
