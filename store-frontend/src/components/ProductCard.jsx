import { Box, Image, Heading, Text, Button, Stack, Badge, Flex } from '@chakra-ui/react'
import { useCart } from '../context/CartContext'

export default function ProductCard({ product }) {
  const { addToCart } = useCart()
  
  return (
    <Box 
      borderWidth="1px" 
      borderRadius="lg" 
      overflow="hidden" 
      p={4} 
      boxShadow="md"
      transition="all 0.2s"
      _hover={{ boxShadow: 'xl' }}
    >
      <Image 
        src={product.image_url} 
        alt={product.name} 
        objectFit="cover" 
        h="200px" 
        w="full"
        borderRadius="md"
      />
      <Stack mt={4} spacing={2}>
        <Heading as="h3" size="md">{product.name}</Heading>
        <Text color="gray.600">{product.description}</Text>
        <Flex justify="space-between" align="center">
          <Text fontWeight="bold" fontSize="xl">{product.price} ₽</Text>
          {product.discount && (
            <Badge colorScheme="green" variant="solid">
              -{product.discount}%
            </Badge>
          )}
        </Flex>
        <Button 
          colorScheme="orange" 
          onClick={() => addToCart(product)}
          mt={2}
          >
          В корзину
        </Button>
      </Stack>
    </Box>
  )
}
