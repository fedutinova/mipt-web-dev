import { useCart } from '../context/CartContext';
import CheckoutForm from '../components/CheckoutForm';
import { useNavigate } from 'react-router-dom';
import { Box, Container, Heading } from '@chakra-ui/react';

export default function Checkout() {
  const { cartItems, clearCart } = useCart();
  const navigate = useNavigate();

  const handleSuccess = () => {
    clearCart();
    navigate('/success');
  };

  return (
    <Container maxW="lg" py={10}>
      <Heading as="h1" size="xl" mb={6}>
        Оформление заказа
      </Heading>
      <Box bg="white" p={6} rounded="md" shadow="md">
        <CheckoutForm cartItems={cartItems} onSubmitSuccess={handleSuccess} />
      </Box>
    </Container>
  );
}
