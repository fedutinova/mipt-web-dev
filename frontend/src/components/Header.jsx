import { Flex, Box, Heading, Button, Spacer, Link as ChakraLink } from '@chakra-ui/react'
import { Link as RouterLink } from 'react-router-dom'
import { useCart } from '../context/CartContext'

export default function Header() {
  const { cartItems } = useCart()
  
  return (
    <Flex as="header" p={4} bg="gray.800" color="white" alignItems="center">
      <Box>
        <Heading as="h1" size="lg">
          <ChakraLink as={RouterLink} to="/" _hover={{ textDecoration: 'none' }}>
            White&Warm
          </ChakraLink>
        </Heading>
      </Box>
      <Spacer />
      <Flex gap={4}>
        <Button as={RouterLink} to="/catalog" variant="ghost" colorScheme="white">
          Каталог
        </Button>
        <Button 
          as={RouterLink} 
          to="/cart" 
          variant="solid" 
          colorScheme="orange"
          position="relative"
        >
          Корзина
          {cartItems.length > 0 && (
            <Box 
              as="span" 
              position="absolute" 
              top="-5px" 
              right="-5px" 
              bg="red.500" 
              color="white" 
              borderRadius="full" 
              w="20px" 
              h="20px" 
              display="flex" 
              alignItems="center" 
              justifyContent="center"
              fontSize="xs"
            >
              {cartItems.length}
            </Box>
          )}
        </Button>
      </Flex>
    </Flex>
  )
}
