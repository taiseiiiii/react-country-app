import { useNavigate } from "react-router-dom";
import type { Country } from "../types/country.types";
import styles from "./CountryCard.module.scss";

export function CountryCard({
  name,
  population,
  region,
  capital,
  flags,
  cca3,
}: Country) {
  const navigate = useNavigate();
  return (
    <div
      className={styles.cardContainer}
      onClick={() => navigate(`/country/${cca3}`)}
    >
      <img
        src={flags.svg}
        alt={flags.alt || `Flag of ${name.official}`}
        className={styles.cardImage}
      />
      <div className={styles.cardContent}>
        <h2 className={styles.countryName}>{name.official}</h2>
        <p>
          <span className={styles.detailLabel}>Population: </span>
          <span>{population.toLocaleString()}</span>
        </p>
        <p>
          <span className={styles.detailLabel}>Region: </span>
          <span>{region}</span>
        </p>
        <p>
          <span className={styles.detailLabel}>Captal: </span>
          <span>{capital}</span>
        </p>
      </div>
    </div>
  );
}
