import { Outlet } from "react-router-dom";

export function RootLayout() {
  return (
    <div className="app">
      <main>
        <Outlet />
      </main>
    </div>
  );
}
