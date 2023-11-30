import apiClient from "../apiClient";
import { useQuery } from '@tanstack/react-query'
import { Product } from "../types/Product";

export const useGetProductsQuery = () =>
  useQuery({
    queryKey: ['products'],
    queryFn: async () => (await apiClient.get<Product[]>('api/products')).data,
  })
