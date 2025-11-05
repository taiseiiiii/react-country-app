import { useMemo, useState } from "react";
import { CountryCard } from "../components/CountryCard";
import { FilterField } from "../components/FilterField";
import { SearchField } from "../components/SearchField";
import { useCountries } from "../hooks/useCountries";
import styles from "./HomePage.module.scss";
import { useDebounce } from "../hooks/useDebounce";
import type { Region } from "../types/country.types";

export function HomePage() {
  const { data, isLoading, error } = useCountries();
  const [searchKeyword, setSearchKeyword] = useState("");
  const [selectedRegion, setselectedRegion] = useState<Region | "">("");

  const deboucedSearchKeyword = useDebounce(searchKeyword);

  const filteredCountries = useMemo(() => {
    if (!data) return [];

    if (!deboucedSearchKeyword && !selectedRegion) return data;

    let countries = data;

    if (deboucedSearchKeyword) {
      countries = countries.filter((country) =>
        country.name.common
          .toLowerCase()
          .includes(deboucedSearchKeyword.toLowerCase())
      );
    }

    if (selectedRegion) {
      countries = countries.filter(
        (country) => country.region === selectedRegion
      );
    }

    return countries;
  }, [data, selectedRegion, deboucedSearchKeyword]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.searchArea}>
        <SearchField value={searchKeyword} onChange={setSearchKeyword} />
        <FilterField value={selectedRegion} onChange={setselectedRegion} />
      </div>
      <div>
        {isLoading ? (
          <div className={styles.loading}>Loading...</div>
        ) : error ? (
          <div className={styles.error}>
            Error loading countries. Please try again.
          </div>
        ) : filteredCountries.length === 0 ? (
          <div className={styles.noResults}>
            No countries found. Try adjusting your search or filter.
          </div>
        ) : (
          <div className={styles.cardwrapper}>
            {filteredCountries.map((country) => (
              <CountryCard key={country.cca3} {...country} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
