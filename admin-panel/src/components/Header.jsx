import { Flex, Heading, Button, Spacer } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <Flex bg="teal.500" color="white" p={4} align="center">
      <Heading size="md" onClick={() => navigate("/admin")} cursor="pointer">
        Панель администратора
      </Heading>
      <Spacer />
      <Button variant="outline" colorScheme="whiteAlpha" onClick={() => navigate("http://localhost:8003/admin/products")} mr={3}>
        Товары
      </Button>
      <Button variant="outline" colorScheme="whiteAlpha" onClick={() => navigate("http://localhost:8003/admin/orders")} mr={3}>
        Заказы
      </Button>
      <Button colorScheme="red" variant="solid" onClick={logout}>
        Выйти
      </Button>
    </Flex>
  );
}
