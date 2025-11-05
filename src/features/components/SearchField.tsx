import { Search } from "lucide-react";
import styles from "./SearchField.module.scss";

interface SearchFieldProps {
  value: string;
  onChange: (value: string) => void;
}

export function SearchField({ value, onChange }: SearchFieldProps) {
  return (
    <div className={styles.searchContainer}>
      <Search className={styles.searchIcon} />
      <input
        type="text"
        placeholder="Search for a country..."
        className={styles.searchInput}
        aria-label="Search for a country"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
