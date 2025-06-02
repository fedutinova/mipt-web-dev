import { 
  FormControl, 
  FormLabel, 
  Input, 
  Button, 
  Stack, 
  FormErrorMessage,
  useToast,
  Flex,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useState } from 'react';

export default function CheckoutForm({ cartItems, onSubmitSuccess }) {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const toast = useToast();

  const onSubmit = async (formData) => {
    setIsSubmitting(true);

    const payload = {
      customer_name: formData.name,
      customer_email: formData.email,
      customer_phone: formData.phone,
      address_line: formData.address || "",
      city: formData.city || "Москва",
      postal_code: formData.postal_code || "101000",
      items: cartItems.map(item => ({
        product_id: item.id,
        product_name: item.name,
        price: item.price,
        quantity: item.quantity
      }))
    };

    try {
      await axios.post("http://0.0.0.0:8002/api/v1/orders", payload);
      toast({
        title: "Заказ оформлен",
        description: "Мы свяжемся с вами для подтверждения",
        status: "success",
        duration: 5000,
        isClosable: true
      });
      onSubmitSuccess();
    } catch (error) {
      toast({
        title: "Ошибка",
        description: "Не удалось оформить заказ",
        status: "error",
        duration: 5000,
        isClosable: true
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
            {...register("name", { required: "Обязательное поле" })}
          />
          <FormErrorMessage>{errors.name?.message}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={errors.phone}>
          <FormLabel>Телефон</FormLabel>
          <Input
            placeholder="+7 (999) 123-45-67"
            {...register("phone", {
              required: "Обязательное поле",
              pattern: {
                value: /^\+?[0-9]{10,15}$/,
                message: "Некорректный номер"
              }
            })}
          />
          <FormErrorMessage>{errors.phone?.message}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={errors.email}>
          <FormLabel>Email</FormLabel>
          <Input
            type="email"
            placeholder="email@example.com"
            {...register("email", {
              required: "Обязательное поле",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Некорректный email"
              }
            })}
          />
          <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
        </FormControl>

                <FormControl isInvalid={errors.postal_code}>
          <FormLabel>Почтовый индекс</FormLabel>
          <Input
            placeholder="101000"
            {...register("postal_code", {
              required: "Обязательное поле",
              pattern: {
                value: /^[0-9]{6}$/,
                message: "Некорректный индекс"
              }
            })}
          />
          <FormErrorMessage>{errors.postal_code?.message}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={errors.city}>
          <FormLabel>Город</FormLabel>
          <Input
            placeholder="Москва"
            {...register("city", { required: "Обязательное поле" })}
          />
          <FormErrorMessage>{errors.city?.message}</FormErrorMessage>
        </FormControl>

        <FormControl>
          <FormLabel>Адрес доставки</FormLabel>
          <Input
            placeholder="Улица, дом, квартира"
            {...register("address")}
          />
        </FormControl>

        <Flex justify="center" mt={3}>
          <Button
            type="submit"
            colorScheme="green"
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
