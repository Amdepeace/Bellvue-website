import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./hooks/useAuth";
import PublicApp from "./PublicApp";
import { AdminGuard } from "./admin/AdminGuard";
import { AdminLayout } from "./admin/AdminLayout";
import { AdminLogin } from "./admin/AdminLogin";
import { BookingsPage } from "./admin/pages/BookingsPage";
import { GuestsPage } from "./admin/pages/GuestsPage";
import { AdminComingSoon } from "./admin/AdminComingSoon";

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route
            path="/admin"
            element={
              <AdminGuard>
                <AdminLayout />
              </AdminGuard>
            }
          >
            <Route index element={<Navigate to="/admin/bookings" replace />} />
            <Route path="bookings" element={<BookingsPage />} />
            <Route path="guests" element={<GuestsPage />} />
            <Route path=":section" element={<AdminComingSoon />} />
          </Route>
          <Route path="/*" element={<PublicApp />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
