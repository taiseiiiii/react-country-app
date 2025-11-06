import { useQuery } from "@tanstack/react-query";
import { countriesApi } from "../services/countriesApi";
import type { Country } from "../types/country.types";

export function useCountries() {
  return useQuery<Country[], Error>({
    queryKey: ["countries"],
    queryFn: countriesApi.getAll,
  });
}

export function useCountryByCode(code: string) {
  return useQuery<Country[], Error>({
    queryKey: ["country", code],
    queryFn: () => countriesApi.getByCode(code),
    enabled: !!code,
  });
}

export function useBorderCountryByCode(borderCodes: string[]) {
  return useQuery<Country[], Error>({
    queryKey: ["borderCountries", borderCodes],
    queryFn: async () => {
      return countriesApi.getNameByCode(borderCodes.join(","));
    },
    enabled: borderCodes.length > 0,
  });
}
