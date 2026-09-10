import { useEffect, useState } from "react";
import axios from "axios";
import "./Dashboard.css";

function Dashboard() {

    const [customers, setCustomers] = useState([]);
    const [vehicles, setVehicles] = useState([]);
    const [bookings, setBookings] = useState([]);

    const getDashboardData = async () => {
        try {

            const customerResponse = await axios.get(
                "http://localhost:8080/customers"
            );

            const vehicleResponse = await axios.get(
                "http://localhost:8080/vehicles"
            );

            const bookingResponse = await axios.get(
                "http://localhost:8080/bookings"
            );

            setCustomers(customerResponse.data);
            setVehicles(vehicleResponse.data);
            setBookings(bookingResponse.data);

        } catch (error) {

            console.error(
                "Error loading dashboard data:",
                error
            );

        }
    };


    useEffect(() => {
        getDashboardData();
    }, []);

const pendingBookings = bookings.filter(
    (b) => b.status === "Pending"
).length;

const inProgressBookings = bookings.filter(
    (b) => b.status === "In Progress"
).length;

const completedBookings = bookings.filter(
    (b) => b.status === "Completed"
).length;

const cancelledBookings = bookings.filter(
    (b) => b.status === "Cancelled"
).length;

const totalRevenue = bookings
    .filter((b) => b.status === "Completed")
    .reduce((total, b) => total + Number(b.cost || 0), 0);

    return (
        <div className="dashboard">

            <div className="dashboard-header">

                <h1>Dashboard</h1>

                <p>
                    Welcome to Vehicle Service Management System
                </p>

            </div>


            {/* Statistics */}

            <div className="stats-container">

                <div className="stat-card">

                    <div className="stat-icon">
                      <i class="fa-solid fa-user-group"></i>
                    </div>

                    <div>
                        <h3>Customers</h3>

                        <h2>
                            {customers.length}
                        </h2>

                        <p>
                            Total Customers
                        </p>
                    </div>

                </div>


                <div className="stat-card">

                    <div className="stat-icon">
                        <i class="fa-solid fa-car"></i>
                    </div>

                    <div>
                        <h3>Vehicles</h3>

                        <h2>
                            {vehicles.length}
                        </h2>

                        <p>
                            Registered Vehicles
                        </p>
                    </div>

                </div>


                <div className="stat-card">

                    <div className="stat-icon">
                       <i class="fa-solid fa-screwdriver-wrench"></i>
                    </div>

                    <div>
                        <h3>Bookings</h3>

                        <h2>
                            {bookings.length}
                        </h2>

                        <p>
                            Service Bookings
                        </p>
                    </div>

                </div>

            </div>

{/* summery */}

 <div className="booking-summary">

    <h2>Booking Summary</h2>

    <div className="summary-container">

        <div className="summary-item">
            <span>Pending</span>
            <strong>{pendingBookings}</strong>
        </div>

        <div className="summary-item">
            <span>In Progress</span>
            <strong>{inProgressBookings}</strong>
        </div>

        <div className="summary-item">
            <span>Completed</span>
            <strong>{completedBookings}</strong>
        </div>

        <div className="summary-item">
            <span>Cancelled</span>
            <strong>
                {cancelledBookings}
            </strong>
        </div>

    </div>

</div>

            {/* Recent Bookings */}

            <div className="recent-section">

                <div className="section-header">

                    <h2>
                        Recent Service Bookings
                    </h2>

                </div>


                <table>

                    <thead>

                        <tr>
                            <th>Service</th>
                            <th>Vehicle</th>
                            <th>Date</th>
                            <th>Status</th>
                            <th>Cost</th>
                        </tr>

                    </thead>


                    <tbody>

                        {bookings.length === 0 ? (

                            <tr>

                                <td
                                    colSpan="5"
                                    className="no-data"
                                >
                                    No service bookings found
                                </td>

                            </tr>

                        ) : (

                            bookings.slice(0, 5).map((b) => (

                                <tr key={b.id}>

                                    <td>
                                        {b.serviceType}
                                    </td>

                                    <td>
                                        {b.vehicle
                                            ? `${b.vehicle.vehicleNumber} - ${b.vehicle.model}`
                                            : "N/A"}
                                    </td>

                                    <td>
                                        {b.serviceDate}
                                    </td>

                                    <td>

                                        <span
                                            className={`status ${b.status
                                                .toLowerCase()
                                                .replace(" ", "-")}`}
                                        >
                                            {b.status}
                                        </span>

                                    </td>

                                    <td>
                                        ₹{b.cost}
                                    </td>

                                </tr>

                            ))

                        )}

                    </tbody>

                </table>

            </div>

        </div>
    );
}

export default Dashboard;