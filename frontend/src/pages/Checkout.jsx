import { 
  FormControl, 
  FormLabel, 
  Input, 
  Button, 
  Stack, 
  FormErrorMessage,
  useToast,
  Flex,
  Text
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useState } from 'react';

export default function CheckoutForm({ onSubmitSuccess }) {
  const { 
    register, 
    handleSubmit, 
    formState: { errors } 
  } = useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const toast = useToast();

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      // Здесь должен быть реальный API-вызов
      await axios.post('/api/orders', data);
      toast({
        title: 'Заказ оформлен',
        description: 'Мы свяжемся с вами для подтверждения',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      onSubmitSuccess();
    } catch (error) {
      toast({
        title: 'Ошибка',
        description: 'Не удалось оформить заказ',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={4}>
        <FormControl isInvalid={errors.name}>
          <FormLabel>Имя</FormLabel>
          <Input 
            placeholder="Ваше имя"
            {...register('name', { required: 'Обязательное поле' })}
          />
          <FormErrorMessage>
            {errors.name && errors.name.message}
          </FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={errors.phone}>
          <FormLabel>Телефон</FormLabel>
          <Input
            placeholder="+7 (999) 123-45-67"
            {...register('phone', {
              required: 'Обязательное поле',
              pattern: {
                value: /^\+?[0-9]{10,15}$/,
                message: 'Некорректный номер'
              }
            })}
          />
          <FormErrorMessage>
            {errors.phone && errors.phone.message}
          </FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={errors.email}>
          <FormLabel>Email</FormLabel>
          <Input
            type="email"
            placeholder="email@example.com"
            {...register('email', {
              required: 'Обязательное поле',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Некорректный email'
              }
            })}
          />
          <FormErrorMessage>
            {errors.email && errors.email.message}
          </FormErrorMessage>
        </FormControl>

        <FormControl>
          <FormLabel>Адрес доставки</FormLabel>
          <Input
            placeholder="Город, улица, дом, квартира"
            {...register('address')}
          />
        </FormControl>

        <FormControl>
          <FormLabel>Комментарий к заказу</FormLabel>
          <Input
            placeholder="Особые пожелания"
            {...register('comment')}
          />
        </FormControl>

        <Flex justify="flex-end">
          <Button
            type="submit"
            colorScheme="teal"
            isLoading={isSubmitting}
            loadingText="Отправка..."
            size="lg"
          >
            Подтвердить заказ
          </Button>
        </Flex>
      </Stack>
    </form>
  );
}
