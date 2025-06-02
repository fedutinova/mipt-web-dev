import { Box, Heading, VStack, useToast, Button } from "@chakra-ui/react";
import axios from 'axios';
import Header from '../components/Header';

export default function Dashboard() {
  const toast = useToast();

  const fetchProducts = async () => {
    try {
      const res = await axios.get('http://localhost:8001/api/v1/products');
      console.log('Товары:', res.data);
      toast({ title: 'Товары загружены', status: 'success' });
    } catch (error) {
      toast({ title: 'Ошибка при загрузке товаров', status: 'error' });
    }
  };

  const fetchOrders = async () => {
    try {
      const res = await axios.get('http://localhost:8002/api/v1/orders');
      console.log('Заказы:', res.data);
      toast({ title: 'Заказы загружены', status: 'success' });
    } catch (error) {
      toast({ title: 'Ошибка при загрузке заказов', status: 'error' });
    }
  };

  return (
    <Box>
      <Header />
      <Box p={6}>
        <Heading mb={4}>Добро пожаловать в панель администратора</Heading>
        <VStack spacing={4} mt={6}>
          <Button colorScheme="teal" onClick={fetchProducts}>
            Загрузить товары
          </Button>
          <Button colorScheme="teal" onClick={fetchOrders}>
            Загрузить заказы
          </Button>
        </VStack>
      </Box>
    </Box>
    
  );
}
