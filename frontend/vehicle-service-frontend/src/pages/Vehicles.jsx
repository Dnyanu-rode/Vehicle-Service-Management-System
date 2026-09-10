import { useEffect, useState } from "react";
import axios from "axios";
import "./Vehicles.css";

function Vehicles() {

    const [vehicles, setVehicles] = useState([]);
    const [search, setSearch] = useState("");
    const [vehicleTypeFilter, setVehicleTypeFilter] = useState("");
    const [customers, setCustomers] = useState([]);

    const [vehicle, setVehicle] = useState({
        vehicleNumber: "",
        brand: "",
        model: "",
        vehicleType: "",
        customer: {
            id: ""
        }
    });

    const [editId, setEditId] = useState(null);


    // Get vehicles
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


    // Get customers
    const getCustomers = async () => {
        try {
            const response = await axios.get(
                "http://localhost:8080/customers"
            );

            setCustomers(response.data);

        } catch (error) {
            console.error("Error fetching customers:", error);
        }
    };


    useEffect(() => {
        getVehicles();
        getCustomers();
    }, []);


    // Handle input
    const handleChange = (e) => {

        setVehicle({
            ...vehicle,
            [e.target.name]: e.target.value
        });

    };


    // Handle customer selection
    const handleCustomerChange = (e) => {

        setVehicle({
            ...vehicle,
            customer: {
                id: e.target.value
            }
        });

    };


    // Add / Update vehicle
    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            const vehicleData = {
                ...vehicle,
                customer: {
                    id: Number(vehicle.customer.id)
                }
            };


            if (editId === null) {

                await axios.post(
                    "http://localhost:8080/vehicles",
                    vehicleData
                );

                alert("Vehicle added successfully!");

            } else {

                await axios.put(
                    `http://localhost:8080/vehicles/${editId}`,
                    vehicleData
                );

                alert("Vehicle updated successfully!");

            }


            // Clear form
            setVehicle({
                vehicleNumber: "",
                brand: "",
                model: "",
                vehicleType: "",
                customer: {
                    id: ""
                }
            });

            setEditId(null);

            getVehicles();

        } catch (error) {

            console.error("Error saving vehicle:", error);
            alert("Operation failed!");

        }
    };


    // Edit vehicle
    const editVehicle = (v) => {

        setVehicle({
            vehicleNumber: v.vehicleNumber,
            brand: v.brand,
            model: v.model,
            vehicleType: v.vehicleType,
            customer: {
                id: v.customer ? v.customer.id : ""
            }
        });

        setEditId(v.id);

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };


    // Delete vehicle
    const deleteVehicle = async (id) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this vehicle?"
        );

        if (!confirmDelete) {
            return;
        }

        try {

            await axios.delete(
                `http://localhost:8080/vehicles/${id}`
            );

            alert("Vehicle deleted successfully!");

            getVehicles();

        } catch (error) {

            console.error("Error deleting vehicle:", error);
            alert("Failed to delete vehicle!");

        }
    };


    // Cancel edit
    const cancelEdit = () => {

        setVehicle({
            vehicleNumber: "",
            brand: "",
            model: "",
            vehicleType: "",
            customer: {
                id: ""
            }
        });

        setEditId(null);
    };

    const filteredVehicles = vehicles.filter((v) => {

        const matchesSearch =
            v.vehicleNumber.toLowerCase().includes(search.toLowerCase()) ||
            v.brand.toLowerCase().includes(search.toLowerCase()) ||
            v.model.toLowerCase().includes(search.toLowerCase());

        const matchesType =
            vehicleTypeFilter === "" ||
            v.vehicleType === vehicleTypeFilter;

        return matchesSearch && matchesType;
    });

    return (
        <div className="vehicles-page">

            <div className="page-header">

                <h1>Vehicles</h1>

                <p>
                    Manage customer vehicles and their details
                </p>

            </div>


            {/* Vehicle Form */}

            <div className="vehicle-form-card">

                <h2>
                    {editId === null
                        ? "Add Vehicle"
                        : "Edit Vehicle"}
                </h2>

                <form onSubmit={handleSubmit}>

                    <div className="form-row">

                        <div className="form-group">

                            <label>Vehicle Number</label>

                            <input
                                type="text"
                                name="vehicleNumber"
                                value={vehicle.vehicleNumber}
                                onChange={handleChange}
                                placeholder="MH12AB1234"
                                required
                            />

                        </div>


                        <div className="form-group">

                            <label>Brand</label>

                            <input
                                type="text"
                                name="brand"
                                value={vehicle.brand}
                                onChange={handleChange}
                                placeholder="Honda"
                                required
                            />

                        </div>

                    </div>


                    <div className="form-row">

                        <div className="form-group">

                            <label>Model</label>

                            <input
                                type="text"
                                name="model"
                                value={vehicle.model}
                                onChange={handleChange}
                                placeholder="City"
                                required
                            />

                        </div>


                        <div className="form-group">

                            <label>Vehicle Type</label>

                            <select
                                name="vehicleType"
                                value={vehicle.vehicleType}
                                onChange={handleChange}
                                required
                            >
                                <option value="">
                                    Select Vehicle Type
                                </option>

                                <option value="Car">
                                    Car
                                </option>

                                <option value="Bike">
                                    Bike
                                </option>

                                <option value="Scooter">
                                    Scooter
                                </option>

                                <option value="Truck">
                                    Truck
                                </option>

                                <option value="SUV">
                                    SUV
                                </option>

                                <option value="Other">
                                    Other
                                </option>

                            </select>
                        </div>

                    </div>


                    <div className="form-group">

                        <label>Customer</label>

                        <select
                            value={vehicle.customer.id}
                            onChange={handleCustomerChange}
                            required
                        >

                            <option value="">
                                Select Customer
                            </option>

                            {customers.map((c) => (

                                <option
                                    key={c.id}
                                    value={c.id}
                                >
                                    {c.name} - {c.phone}
                                </option>

                            ))}

                        </select>

                    </div>


                    <button
                        type="submit"
                        className="add-button"
                    >
                        {editId === null
                            ? "+ Add Vehicle"
                            : "Update Vehicle"}
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


            {/* Vehicle List */}

            <div className="vehicle-list-card">
                <div className="list-header">

                    <div>
                        <h2>Vehicle List</h2>
                        <span>Total: {vehicles.length}</span>
                    </div>

                    <div className="vehicle-filters">

                        <input
                            type="text"
                            className="search-box"
                            placeholder="Search vehicle..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />

                        <select
                            className="filter-select"
                            value={vehicleTypeFilter}
                            onChange={(e) => setVehicleTypeFilter(e.target.value)}
                        >
                            <option value="">All Types</option>
                            <option value="Car">Car</option>
                            <option value="Bike">Bike</option>
                            <option value="Scooter">Scooter</option>
                            <option value="SUV">SUV</option>
                            <option value="Truck">Truck</option>
                            <option valu e="Other">Other</option>
                        </select>

                    </div>

                </div>


                <table>

                    <thead>

                        <tr>
                            <th>ID</th>
                            <th>Vehicle Number</th>
                            <th>Brand</th>
                            <th>Model</th>
                            <th>Type</th>
                            <th>Customer</th>
                            <th>Actions</th>
                        </tr>

                    </thead> 


                    <tbody>

                        {vehicles.length === 0 ? (

                            <tr>

                                <td
                                    colSpan="7"
                                    className="no-data"
                                >
                                    No vehicles found
                                </td>

                            </tr>

                        ) : (

                            filteredVehicles.map((v) => (

                                <tr key={v.id}>

                                    <td>{v.id}</td>

                                    <td>{v.vehicleNumber}</td>

                                    <td>{v.brand}</td>

                                    <td>{v.model}</td>

                                    <td>{v.vehicleType}</td>

                                    <td>
                                        {v.customer
                                            ? v.customer.name
                                            : "N/A"}
                                    </td>

                                    <td>

                                        <button
                                            className="edit-button"
                                            onClick={() =>
                                                editVehicle(v)
                                            }
                                        >
                                            Edit
                                        </button>

                                        <button
                                            className="delete-button"
                                            onClick={() =>
                                                deleteVehicle(v.id)
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

export default Vehicles;