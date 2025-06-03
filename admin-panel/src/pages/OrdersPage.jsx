import { useEffect, useState } from 'react';
import {
  Box, Heading, Table, Thead, Tbody, Tr, Th, Td, useToast, Select
} from '@chakra-ui/react';
import axios from 'axios';
import Header from "../components/Header";

export function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const toast = useToast();

  const fetchOrders = async () => {
    const res = await axios.get('http://localhost:8002/api/v1/orders');
    setOrders(res.data);
  };

  const updateStatus = async (orderId, status) => {
    try {
      await axios.put(`http://localhost:8002/api/v1/orders/${orderId}/status`, null, {
        params: { status }
      });
      setOrders((prev) => prev.map((o) => o.id === orderId ? { ...o, status } : o));
      toast({ title: 'Статус обновлен', status: 'success' });
    } catch (err) {
      toast({ title: 'Ошибка обновления статуса', status: 'error' });
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <Box>
      <Header />
      <Box p={6}>
        <Heading mb={4}>Заказы</Heading>
        <Table>
          <Thead>
            <Tr>
              <Th>ID</Th>
              <Th>Имя клиента</Th>
              <Th>Телефон</Th>
              <Th>Email</Th>
              <Th>Город</Th>
              <Th>Статус</Th>
            </Tr>
          </Thead>
          <Tbody>
            {orders.map((o) => (
              <Tr key={o.id}>
                <Td>{o.id}</Td>
                <Td>{o.customer_name}</Td>
                <Td>{o.customer_phone}</Td>
                <Td>{o.customer_email}</Td>
                <Td>{o.city}</Td>
                <Td>
                  <Select
                    size="sm"
                    value={o.status}
                    onChange={(e) => updateStatus(o.id, e.target.value)}
                  >
                    <option value="pending">Ожидает</option>
                    <option value="paid">Оплачен</option>
                    <option value="shipped">Отправлен</option>
                    <option value="completed">Завершён</option>
                    <option value="cancelled">Отменён</option>
                  </Select>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    </Box>
  );
}
