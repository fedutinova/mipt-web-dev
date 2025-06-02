import { Box, Text, Flex, Link, VStack, HStack } from '@chakra-ui/react'
import { Link as RouterLink } from 'react-router-dom'

export default function Footer() {
  return (
    <Box as="footer" bg="gray.800" color="white" py={8} mt={8}>
      <Flex 
        maxW="1200px" 
        mx="auto" 
        px={4} 
        justify="space-between" 
        direction={{ base: 'column', md: 'row' }}
        gap={8}
      >
        <VStack align="flex-start" spacing={4}>
          <Text fontSize="xl" fontWeight="bold">Магазин лампочек</Text>
          <Text color="gray.400">Осветите свою жизнь</Text>
        </VStack>

        <HStack spacing={8}>
          <VStack align="flex-start" spacing={2}>
            <Text fontWeight="bold">Меню</Text>
            <Link as={RouterLink} to="/" color="gray.400" _hover={{ color: 'white' }}>
              Главная
            </Link>
            <Link as={RouterLink} to="/catalog" color="gray.400" _hover={{ color: 'white' }}>
              Каталог
            </Link>
            <Link as={RouterLink} to="/cart" color="gray.400" _hover={{ color: 'white' }}>
              Корзина
            </Link>
          </VStack>

          <VStack align="flex-start" spacing={2}>
            <Text fontWeight="bold">Контакты</Text>
            <Text color="gray.400">Email: info@lampochka.ru</Text>
            <Text color="gray.400">Телефон: +7 (123) 456-78-90</Text>
            <Text color="gray.400">Адрес: г. Москва, ул. Светлая, 15</Text>
          </VStack>
        </HStack>
      </Flex>

      <Box borderTopWidth="1px" borderColor="gray.700" mt={8} pt={4}>
        <Text textAlign="center" color="gray.500">
          © {new Date().getFullYear()} Магазин лампочек. Все права защищены.
        </Text>
      </Box>
    </Box>
  )
}
