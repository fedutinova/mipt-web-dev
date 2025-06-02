import { Box, Container } from "@chakra-ui/react";
import Header from "./Header";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <Box minH="100vh" bg="gray.50">
      <Header />
      <Container maxW="container.lg" pt={8}>
        <Outlet />
      </Container>
    </Box>
  );
}
