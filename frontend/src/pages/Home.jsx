import { Box, Heading, Text, Button, Flex, Image, Stack, SimpleGrid } from '@chakra-ui/react'
import { Link as RouterLink } from 'react-router-dom'
import ProductCard from '../components/ProductCard'

const featuredProducts = [
  {
    id: 1,
    name: 'LED лампа E27 10W',
    description: 'Тёплый свет, эквивалент 75W лампы накаливания',
    price: 299,
    image: 'https://lighting.su/upload/iblock/cbe/cbe4fd1f8392b39c44c56214f3b8d90a.jpg',
    type: 'led'
  },
  {
    id: 2,
    name: 'Галогенная лампа G9 40W',
    description: 'Яркий точечный свет для интерьерного освещения',
    price: 189,
    image: 'https://cdn.minimir.ru/images/catalog/galogennaya-lampa-40w-g9-g9-220v40w-a022321_0002.jpg',
    type: 'halogen'
  },
  {
    id: 3,
    name: 'Энергосберегающая лампа E14 15W',
    description: 'Холодный белый свет, долгий срок службы',
    price: 349,
    image: 'https://donplafon.ru/upload/iblock/fa9/zkm60s9erkr3n8jvif1usfmsqlnlsoga/lampa_energosberegayushchaya_uniel_00554_e14_15w_2700k_matovaya_esl_s11_15_2700_e14.jpeg',
    type: 'energy-saving',
    discount: 15
  }
]

export default function Home() {
  return (
    <Box>
      <Flex 
        direction={{ base: 'column', md: 'row' }} 
        align="center" 
        p={8}
        borderRadius="md"
        margin={100}
      >
        <Box flex="1" p={4}>
          <Heading as="h1" size="2xl" mb={10}>
            Осветите свой дом
          </Heading>
          <Text fontSize="lg" mb={10}>
            Широкий ассортимент качественных лампочек для любого светильника. 
            Энергосберегающие, LED, галогенные и лампы накаливания.
          </Text>
          <Button 
            as={RouterLink} 
            to="/catalog" 
            colorScheme="orange" 
            size="lg"
          >
            В каталог
          </Button>
        </Box>
        <Box flex="1">
          <Image 
            src="https://fira.ru/wp-content/uploads/2018/04/back-lamps2.png" 
            alt="Разные виды лампочек" 
            borderRadius="md"
          />
        </Box>
      </Flex>

      {/* Рекомендуемые товары */}
      <Box py={8}>
        <Heading as="h2" size="lg" mb={6} textAlign="center">
          Популярные товары
        </Heading>
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6}>
          {featuredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </SimpleGrid>
      </Box>

      {/* Преимущества */}
      <Box py={8} bg="gray.50" borderRadius="md" px={4}>
        <Heading as="h2" size="lg" mb={6} textAlign="center">
          Почему выбирают нас
        </Heading>
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6}>
          <Stack spacing={3} textAlign="center">
            <Text fontSize="2xl" fontWeight="bold">🛒</Text>
            <Text fontWeight="bold">Быстрая доставка</Text>
            <Text color="gray.600">Доставка по всей России за 1-3 дня</Text>
          </Stack>
          <Stack spacing={3} textAlign="center">
            <Text fontSize="2xl" fontWeight="bold">🔧</Text>
            <Text fontWeight="bold">Гарантия качества</Text>
            <Text color="gray.600">Все товары сертифицированы</Text>
          </Stack>
          <Stack spacing={3} textAlign="center">
            <Text fontSize="2xl" fontWeight="bold">💰</Text>
            <Text fontWeight="bold">Лучшие цены</Text>
            <Text color="gray.600">Гарантия лучшей цены на рынке</Text>
          </Stack>
        </SimpleGrid>
      </Box>
    </Box>
  )
}
