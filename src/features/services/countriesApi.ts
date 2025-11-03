import { fetchApi } from "@/api/client";
import type { Country } from "../types/country.types";

const API_BASE_URL = "https://restcountries.com/v3.1";

export const countriesApi = {
  getAll: (): Promise<Country[]> => {
    return fetchApi<Country[]>(`${API_BASE_URL}/all`);
  },
  getByCode: (code: string): Promise<Country[]> => {
    return fetchApi<Country[]>(`${API_BASE_URL}/alpha/${code}`);
  },
};
