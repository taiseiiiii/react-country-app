import { useEffect, useRef, useState } from "react";
import styles from "./FilterField.module.scss";
import type { Region } from "../types/country.types";

interface FilterFieldProps {
  value: string;
  onChange: (value: Region | "") => void;
}

export function FilterField({ value, onChange }: FilterFieldProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const regions = ["Africa", "Americas", "Asia", "Europe", "Oceania"];

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSelect = (region: Region) => {
    onChange(region);
    setIsOpen(false);
  };

  return (
    <div className={styles.customDropdown} ref={dropdownRef}>
      <button
        className={styles.drowdownTrigger}
        onClick={() => setIsOpen(!isOpen)}
      >
        {value || "Filter by Region"}
        <span className={`arrow ${isOpen ? "open" : ""}`}>▼</span>
      </button>

      {isOpen && (
        <ul className={styles.dropdownMenu}>
          {regions.map((region) => (
            <li key={region} onClick={() => handleSelect(region as Region)}>
              {region}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
