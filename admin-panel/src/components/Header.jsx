import { Flex, Heading, Button, Spacer } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <Flex bg="black.0" color="white" p={4} align="center">
      <Heading size="md" onClick={() => navigate("/")} cursor="pointer">
        Панель администратора
      </Heading>
      <Spacer />
      <Button variant="ghost" colorScheme="white" onClick={() => navigate("/products")} mr={3}>
        Товары
      </Button>
      <Button variant="ghost" colorScheme="white" onClick={() => navigate("/orders")} mr={3}>
        Заказы
      </Button>
      <Button colorScheme="red" variant="solid" onClick={logout}>
        Выйти
      </Button>
    </Flex>
  );
}
