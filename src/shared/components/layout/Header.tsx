import { ThemeToggle } from "@/features/theme/components/ThemeToggle";
import styles from "./Header.module.scss";

export function Header() {
  return (
    <div className={styles.header}>
      <p>Where in the world?</p>
      <ThemeToggle />
    </div>
  );
}
