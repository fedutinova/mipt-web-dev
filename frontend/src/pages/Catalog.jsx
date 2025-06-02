import { SimpleGrid, Box, Heading, Input, Select } from '@chakra-ui/react'
import { useState, useEffect } from 'react'
import ProductCard from '../components/ProductCard'
import axios from 'axios'

export default function Catalog() {
  const [products, setProducts] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [filter, setFilter] = useState('all')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:8001/api/v1/products')
        setProducts(response.data)
      } catch (error) {
        console.error('Error fetching products:', error)
      } finally {
        setIsLoading(false)
      }
    }
    
    fetchProducts()
  }, [])

  const filteredProducts = (products || []).filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         product.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filter === 'all' || product.type === filter
    return matchesSearch && matchesFilter
  })

  if (isLoading) return <Box p={4}>Загрузка...</Box>

  return (
    <Box p={4}>
      <Heading as="h2" mb={6}>Каталог лампочек</Heading>
      
      <Box mb={6} display="flex" gap={4}>
        <Input 
          placeholder="Поиск по названию или описанию..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          maxW="400px"
        />
        <Select 
          value={filter} 
          onChange={(e) => setFilter(e.target.value)}
          maxW="200px"
        >
          <option value="all">Все типы</option>
          <option value="led">LED</option>
          <option value="incandescent">Лампы накаливания</option>
          <option value="halogen">Галогенные</option>
          <option value="energy-saving">Энергосберегающие</option>
        </Select>
      </Box>
      
      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
        {filteredProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </SimpleGrid>
    </Box>
  )
}
