import { useEffect, useState } from 'react';
import {
  Box, Heading, Table, Thead, Tbody, Tr, Th, Td, useToast, Select
} from '@chakra-ui/react';
import axios from 'axios';

export function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const toast = useToast();

  const fetchOrders = async () => {
    const res = await axios.get('http://localhost:8000/api/v1/orders');
    setOrders(res.data);
  };

  const updateStatus = async (orderId, status) => {
    try {
      await axios.put(`http://localhost:8000/api/v1/orders/${orderId}`, { status });
      toast({ title: 'Статус обновлен', status: 'success' });
      fetchOrders();
    } catch (err) {
      toast({ title: 'Ошибка обновления статуса', status: 'error' });
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <Box p={6}>
      <Heading mb={4}>Заказы</Heading>
      <Table>
        <Thead>
          <Tr>
            <Th>ID</Th>
            <Th>Имя клиента</Th>
            <Th>Телефон</Th>
            <Th>Email</Th>
            <Th>Статус</Th>
            <Th>Действия</Th>
          </Tr>
        </Thead>
        <Tbody>
          {orders.map(o => (
            <Tr key={o.id}>
              <Td>{o.id}</Td>
              <Td>{o.customer_name}</Td>
              <Td>{o.customer_phone}</Td>
              <Td>{o.customer_email}</Td>
              <Td>{o.status}</Td>
              <Td>
                <Select
                  size="sm"
                  defaultValue={o.status}
                  onChange={e => updateStatus(o.id, e.target.value)}
                >
                  <option value="new">Новый</option>
                  <option value="processing">В обработке</option>
                  <option value="done">Выполнен</option>
                </Select>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
}
