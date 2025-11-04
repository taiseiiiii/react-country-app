import { Outlet } from "react-router-dom";
import { Header } from "./Header";

export function RootLayout() {
  return (
    <div className="app">
      <main>
        <Header />
        <Outlet />
      </main>
    </div>
  );
}
