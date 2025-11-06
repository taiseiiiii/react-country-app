import { useNavigate, useParams } from "react-router-dom";
import {
  useBorderCountryByCode,
  useCountryByCode,
} from "../hooks/useCountries";
import styles from "./CountryDetailPage.module.scss";
import type { Country } from "../types/country.types";

export function CountryDetailPage() {
  const params = useParams();
  const navigate = useNavigate();
  const {
    data: countryDetal,
    isLoading,
    error,
  } = useCountryByCode(params.code as string);

  const country = countryDetal?.[0];

  const { data: borderCountryes } = useBorderCountryByCode(
    country?.borders ?? []
  );

  if (!country) return <div>Not found</div>;

  const getNativeName = (country: Country) => {
    if (!country.name.nativeName) return country.name.official;

    const nativeNames = Object.values(country.name.nativeName);
    return nativeNames[0]?.official || country.name.official;
  };

  const getLanguage = (country: Country) => {
    if (!country.languages) return "N/A";

    return Object.values(country.languages).join(", ");
  };

  const getCurrency = (country: Country) => {
    if (!country.currencies) return "N/A";

    return Object.values(country.currencies)
      .map((currency) => currency.name)
      .join(", ");
  };

  return (
    <div className="container">
      {isLoading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>Error</div>
      ) : (
        <div>
          <button className={styles.backButton} onClick={() => navigate(-1)}>
            <span>←</span>
            Back
          </button>
          <div className={styles.wrapper}>
            <div className={styles.imgArea}>
              <img
                src={country.flags.svg}
                alt={country.flags.alt ?? "Country Flag"}
              />
            </div>
            <div className={styles.contentArea}>
              <h2 className={styles.countryName}>{country.name.official}</h2>
              <div className={styles.detailInfoArea}>
                <div className={styles.firstContent}>
                  <p>
                    <span className={styles.detailLabel}>Native Name: </span>
                    <span>{getNativeName(country)}</span>
                  </p>
                  <p>
                    <span className={styles.detailLabel}>Population: </span>
                    <span>{country.population.toLocaleString()}</span>
                  </p>
                  <p>
                    <span className={styles.detailLabel}>Region: </span>
                    <span>{country.region}</span>
                  </p>
                  {country.subregion && (
                    <p>
                      <span className={styles.detailLabel}>Sub Region: </span>
                      <span>{country.subregion}</span>
                    </p>
                  )}
                  <p>
                    <span className={styles.detailLabel}>Capital: </span>
                    <span>{country.capital?.join(", ")}</span>
                  </p>
                </div>
                <div className={styles.secondContent}>
                  <p>
                    <span className={styles.detailLabel}>
                      Top Level Domain:{" "}
                    </span>
                    {country.tld! &&
                      country.tld!.map((e, index) => (
                        <span key={index}>{e}</span>
                      ))}
                  </p>
                  <p>
                    <span className={styles.detailLabel}>Currencies: </span>
                    {getCurrency(country)}
                  </p>
                  <p>
                    <span className={styles.detailLabel}>Languages: </span>
                    {getLanguage(country)}
                  </p>
                </div>
              </div>
              {country.borders && (
                <div className={styles.borderArea}>
                  <h3>Border Countries</h3>
                  {borderCountryes?.map((border) => (
                    <button
                      key={border.cca3}
                      onClick={() => navigate(`/country/${border.cca3}`)}
                    >
                      {border.name.common}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
