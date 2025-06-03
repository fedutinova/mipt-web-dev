import { useEffect, useState, useRef } from 'react';
import {
  Box, Button, Heading, Table, Thead, Tbody, Tr, Th, Td, Flex, IconButton, useDisclosure
} from '@chakra-ui/react';
import { DeleteIcon } from '@chakra-ui/icons';
import axios from 'axios';
import {
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter
} from '@chakra-ui/react';
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef(null);

  const fetchProducts = async () => {
    const res = await axios.get('http://localhost:8001/api/v1/products');
    setProducts(res.data);
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:8001/api/v1/products/${selectedProduct.id}`);
      toast({ title: 'Товар удален', status: 'success' });
      fetchProducts();
    } catch (err) {
      toast({ title: 'Ошибка удаления', status: 'error' });
    } finally {
      setSelectedProduct(null);
      onClose();
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
              <Th></Th>
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
                  <Flex gap={2}>
                  <Button size="sm" onClick={() => navigate(`/products/${p.id}/edit`)}>Изменить</Button>
                {/* </Td>
                <Td> */}
                  <IconButton
                      aria-label="Удалить"
                      icon={<DeleteIcon />}
                      size="sm"
                      colorScheme="red"
                      onClick={() => {
                        setSelectedProduct(p);
                        onOpen();
                      }}
                    />
                    </Flex>
                  </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Подтверждение удаления
            </AlertDialogHeader>

            <AlertDialogBody>
              Вы действительно хотите удалить "{selectedProduct?.name}"?
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>Отмена</Button>
              <Button colorScheme="red" onClick={handleDelete} ml={3}>
                Удалить
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Box>
  );
}
