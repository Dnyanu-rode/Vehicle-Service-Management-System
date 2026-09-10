import { Link, useLocation } from "react-router-dom";
import "./Navbar.css";

function Navbar() {

    const location = useLocation();

    return (
        <nav className="navbar">

            <div className="navbar-brand">
                <span className="car-icon">
                  <i class="fa-solid fa-car-side"></i>
                </span>
                <span>Vehicle Service</span>
            </div>

            <div className="navbar-links">

                {/* Dashboard */}
                <Link
                    to="/dashboard"
                    className={
                        location.pathname === "/dashboard"
                            ? "active"
                            : ""
                    }
                >
                    Dashboard
                </Link>

                {/* Customers */}
                <Link
                    to="/customers"
                    className={
                        location.pathname === "/customers"
                            ? "active"
                            : ""
                    }
                >
                    Customers
                </Link>

                {/* Vehicles */}
                <Link
                    to="/vehicles"
                    className={
                        location.pathname === "/vehicles"
                            ? "active"
                            : ""
                    }
                >
                    Vehicles
                </Link>

                {/* Bookings */}
                <Link
                    to="/bookings"
                    className={
                        location.pathname === "/bookings"
                            ? "active"
                            : ""
                    }
                >
                    Bookings
                </Link>

            </div>

        </nav>
    );
}

export default Navbar;