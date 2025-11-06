import { fetchApi } from "@/api/client";
import type { Country } from "../types/country.types";

const API_BASE_URL = "https://restcountries.com/v3.1";

export const countriesApi = {
  getAll: (): Promise<Country[]> => {
    return fetchApi<Country[]>(
      `${API_BASE_URL}/all?fields=name,population,region,capital,flags,cca3`
    );
  },
  getByCode: (code: string): Promise<Country[]> => {
    return fetchApi<Country[]>(`${API_BASE_URL}/alpha/${code}`);
  },
  getNameByCode: (code: string): Promise<Country[]> => {
    return fetchApi<Country[]>(
      `${API_BASE_URL}/alpha?codes=${code}?fields=name,cca3`
    );
  },
};
