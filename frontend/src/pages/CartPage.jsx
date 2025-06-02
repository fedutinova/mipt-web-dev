import { Box, Heading, Text, Button, VStack, HStack, Divider } from '@chakra-ui/react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom'

export default function CartPage() {
  const { cartItems, removeFromCart, updateQuantity, clearCart } = useCart();

  const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const navigate = useNavigate()

  return (
    <Box p={4}>
      <Heading mb={4}>Корзина</Heading>

      {cartItems.length === 0 ? (
        <Text>Ваша корзина пуста.</Text>
      ) : (
        <VStack spacing={4} align="stretch">
          {cartItems.map(item => (
            <Box key={item.id} borderWidth="1px" borderRadius="md" p={4}>
              <HStack justify="space-between">
                <Text>{item.name}</Text>
                <Text>{item.price} ₽ × {item.quantity}</Text>
              </HStack>
              <HStack mt={2}>
                <Button size="sm" onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</Button>
                <Text>{item.quantity}</Text>
                <Button size="sm" onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</Button>
                <Button size="sm" colorScheme="red" onClick={() => removeFromCart(item.id)}>Удалить</Button>
              </HStack>
            </Box>
          ))}
          <Divider />
          <Text fontWeight="bold">Итого: {totalPrice} ₽</Text>
          <Button colorScheme="green" onClick={() => navigate('/checkout')}>
            Оформить заказ
          </Button>
        </VStack>
      )}
    </Box>
  );
}
