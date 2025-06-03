import { Box, Heading, VStack, useToast, Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import Header from '../components/Header';

export default function Dashboard() {
  const toast = useToast();
  const navigate = useNavigate();

  return (
    <Box>
      <Header />
      <Box p={6}>
        <Heading mb={4}>Добро пожаловать в панель администратора</Heading>
        <VStack spacing={4} mt={6}>
          <Button variant="outline" colorScheme="black" size='lg' width='300px' onClick={() => navigate("/products")} mr={3}>
            Товары
          </Button>
          <Button variant="outline" colorScheme="black" size='lg' width='300px' onClick={() => navigate("/orders")} mr={3}>
            Заказы
          </Button>
        </VStack>
      </Box>
    </Box>
    
  );
}
