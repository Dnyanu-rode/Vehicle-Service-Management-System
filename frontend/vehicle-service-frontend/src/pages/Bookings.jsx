import { useEffect, useState } from "react";
import axios from "axios";
import "./Bookings.css";

function Bookings() {

    const [bookings, setBookings] = useState([]);
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("");
    const [vehicles, setVehicles] = useState([]);

    const [booking, setBooking] = useState({
        serviceType: "",
        serviceDate: "",
        status: "Pending",
        cost: "",
        vehicle: {
            id: ""
        }
    });

    const [editId, setEditId] = useState(null);


    // Get all bookings
    const getBookings = async () => {
        try {
            const response = await axios.get(
                "http://localhost:8080/bookings"
            );

            setBookings(response.data);

        } catch (error) {
            console.error("Error fetching bookings:", error);
        }
    };


    // Get all vehicles
    const getVehicles = async () => {
        try {
            const response = await axios.get(
                "http://localhost:8080/vehicles"
            );

            setVehicles(response.data);

        } catch (error) {
            console.error("Error fetching vehicles:", error);
        }
    };


    useEffect(() => {
        getBookings();
        getVehicles();
    }, []);


    // Handle normal inputs
    const handleChange = (e) => {

        setBooking({
            ...booking,
            [e.target.name]: e.target.value
        });

    };


    // Handle vehicle selection
    const handleVehicleChange = (e) => {

        setBooking({
            ...booking,
            vehicle: {
                id: e.target.value
            }
        });

    };


    // Add / Update booking
    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            const bookingData = {
                ...booking,
                cost: Number(booking.cost),
                vehicle: {
                    id: Number(booking.vehicle.id)
                }
            };


            if (editId === null) {

                await axios.post(
                    "http://localhost:8080/bookings",
                    bookingData
                );

                alert("Service booking added successfully!");

            } else {

                await axios.put(
                    `http://localhost:8080/bookings/${editId}`,
                    bookingData
                );

                alert("Service booking updated successfully!");

            }


            // Clear form
            setBooking({
                serviceType: "",
                serviceDate: "",
                status: "Pending",
                cost: "",
                vehicle: {
                    id: ""
                }
            });

            setEditId(null);

            getBookings();

        } catch (error) {

            console.error("Error saving booking:", error);
            alert("Operation failed!");

        }
    };


    // Edit booking
    const editBooking = (b) => {

        setBooking({
            serviceType: b.serviceType,
            serviceDate: b.serviceDate,
            status: b.status,
            cost: b.cost,
            vehicle: {
                id: b.vehicle ? b.vehicle.id : ""
            }
        });

        setEditId(b.id);

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };


    // Delete booking
    const deleteBooking = async (id) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this booking?"
        );

        if (!confirmDelete) {
            return;
        }

        try {

            await axios.delete(
                `http://localhost:8080/bookings/${id}`
            );

            alert("Booking deleted successfully!");

            getBookings();

        } catch (error) {

            console.error("Error deleting booking:", error);
            alert("Failed to delete booking!");

        }
    };


    // Cancel edit
    const cancelEdit = () => {

        setBooking({
            serviceType: "",
            serviceDate: "",
            status: "Pending",
            cost: "",
            vehicle: {
                id: ""
            }
        });

        setEditId(null);
    };


    const filteredBookings = bookings.filter((b) => {

    const searchText = search.toLowerCase();

    const matchesSearch =
        b.serviceType.toLowerCase().includes(searchText) ||
        (b.vehicle &&
            b.vehicle.vehicleNumber.toLowerCase().includes(searchText));

    const matchesStatus =
        statusFilter === "" ||
        b.status === statusFilter;

    return matchesSearch && matchesStatus;
});

    return (
        <div className="bookings-page">

            <div className="page-header">

                <h1>Service Bookings</h1>

                <p>
                    Manage vehicle service bookings
                </p>

            </div>


            {/* Booking Form */}

            <div className="booking-form-card">

                <h2>
                    {editId === null
                        ? "Add Service Booking"
                        : "Edit Service Booking"}
                </h2>

                <form onSubmit={handleSubmit}>

                    <div className="form-row">

                        <div className="form-group">

                            <label>Service Type</label>

                            <select
                                name="serviceType"
                                value={booking.serviceType}
                                onChange={handleChange}
                                required
                            >
                                <option value="">
                                    Select Service
                                </option>

                                <option value="Oil Change">
                                    Oil Change
                                </option>

                                <option value="General Service">
                                    General Service
                                </option>

                                <option value="Brake Service">
                                    Brake Service
                                </option>

                                <option value="Engine Service">
                                    Engine Service
                                </option>

                                <option value="AC Service">
                                    AC Service
                                </option>

                                <option value="Other">
                                    Other
                                </option>

                            </select>

                        </div>


                        <div className="form-group">

                            <label>Vehicle</label>

                            <select
                                value={booking.vehicle.id}
                                onChange={handleVehicleChange}
                                required
                            >

                                <option value="">
                                    Select Vehicle
                                </option>

                                {vehicles.map((v) => (

                                    <option
                                        key={v.id}
                                        value={v.id}
                                    >
                                        {v.vehicleNumber} - {v.brand} {v.model}
                                    </option>

                                ))}

                            </select>

                        </div>

                    </div>


                    <div className="form-row">

                        <div className="form-group">

                            <label>Service Date</label>

                            <input
                                type="date"
                                name="serviceDate"
                                value={booking.serviceDate}
                                onChange={handleChange}
                                required
                            />

                        </div>


                        <div className="form-group">

                            <label>Status</label>

                            <select
                                name="status"
                                value={booking.status}
                                onChange={handleChange}
                                required
                            >

                                <option value="Pending">
                                  <i class="fa-solid fa-hourglass-half"></i>Pending
                                </option>

                                <option value="In Progress">
                                    <i class="fa-solid fa-gear"></i>In Progress
                                </option>

                                <option value="Completed">
                                    <i class="fa-solid fa-circle-check"></i>Completed
                                </option>

                                <option value="Cancelled">
                                    <i class="fa-regular fa-circle-xmark"></i>Cancelled
                                </option>

                            </select>

                        </div>

                    </div>


                    <div className="form-group">

                        <label>Service Cost (₹)</label>

                        <input
                            type="number"
                            name="cost"
                            value={booking.cost}
                            onChange={handleChange}
                            placeholder="Enter service cost"
                            min="0"
                            required
                        />

                    </div>


                    <button
                        type="submit"
                        className="add-button"
                    >
                        {editId === null
                            ? "+ Add Booking"
                            : "Update Booking"}
                    </button>


                    {editId !== null && (

                        <button
                            type="button"
                            className="cancel-button"
                            onClick={cancelEdit}
                        >
                            Cancel
                        </button>

                    )}

                </form>

            </div>


            {/* Booking List */}

            <div className="booking-list-card">

                <div className="list-header">

    <div>
        <h2>Booking List</h2>
        <span>Total: {bookings.length}</span>
    </div>

    <div className="booking-filters">

        <input
            type="text"
            className="search-box"
            placeholder="Search booking..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
        />

        <select
            className="filter-select"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
        >
            <option value="">All Status</option>
            <option value="Pending"><i class="fa-solid fa-hourglass-half"></i> Pending</option>
            <option value="In Progress"><i class="fa-solid fa-gear"></i> In Progress</option>
            <option value="Completed"><i class="fa-solid fa-circle-check"></i> Completed</option>
            <option value="Cancelled"><i class="fa-regular fa-circle-xmark"></i> Cancelled</option>
        </select>  

    </div>

</div>

                <table>

                    <thead>

                        <tr>
                            <th>ID</th>
                            <th>Service</th>
                            <th>Vehicle</th>
                            <th>Date</th>
                            <th>Status</th>
                            <th>Cost</th>
                            <th>Actions</th>
                        </tr>

                    </thead>


                    <tbody>   
                        {filteredBookings.length === 0 ? (

                            <tr>

                                <td
                                    colSpan="7"
                                    className="no-data"
                                >
                                    No bookings found
                                </td>

                            </tr>

                        ) : (

                          filteredBookings.map((b) => (

                                <tr key={b.id}>

                                    <td>{b.id}</td>

                                    <td>{b.serviceType}</td>

                                    <td>
                                        {b.vehicle
                                            ? `${b.vehicle.vehicleNumber} - ${b.vehicle.model}`
                                            : "N/A"}
                                    </td>

                                    <td>{b.serviceDate}</td>

                                    <td>

                                        <span
                                            className={`status ${b.status
                                                .toLowerCase()
                                                .replace(" ", "-")}`}
                                        >
                                            {b.status}
                                        </span>

                                    </td>

                                    <td>₹{b.cost}</td>

                                    <td>

                                        <button
                                            className="edit-button"
                                            onClick={() =>
                                                editBooking(b)
                                            }
                                        >
                                            Edit
                                        </button>

                                        <button
                                            className="delete-button"
                                            onClick={() =>
                                                deleteBooking(b.id)
                                            }
                                        >
                                            Delete
                                        </button>

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

export default Bookings;