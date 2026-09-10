import {
    BrowserRouter,
    Routes,
    Route,
    Navigate,
    useLocation
} from "react-router-dom";

import Navbar from "./components/Navbar";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Customers from "./pages/Customers";
import Vehicles from "./pages/Vehicles";
import Bookings from "./pages/Bookings";


function AppContent() {

    const location = useLocation();

    return (
        <>
            {location.pathname !== "/login" && <Navbar />}

            <Routes>

                <Route
                    path="/login"
                    element={<Login />}
                />

                <Route
                    path="/"
                    element={<Navigate to="/login" replace />}
                />

                <Route
                    path="/dashboard"
                    element={<Dashboard />}
                />

                <Route
                    path="/customers"
                    element={<Customers />}
                />

                <Route
                    path="/vehicles"
                    element={<Vehicles />}
                />

                <Route
                    path="/bookings"
                    element={<Bookings />}
                />

                <Route
                    path="*"
                    element={<Navigate to="/login" replace />}
                />

            </Routes>
        </>
    );
}


function App() {

    return (
        <BrowserRouter>
            <AppContent />
        </BrowserRouter>
    );
}


export default App;