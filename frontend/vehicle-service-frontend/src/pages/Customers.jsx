import { useEffect, useState } from "react";
import axios from "axios";
import "./Customers.css";

function Customers() {

    const [customers, setCustomers] = useState([]);

    const [customer, setCustomer] = useState({
        name: "",
        email: "",
        phone: "",
        address: ""
    });

    const [editId, setEditId] = useState(null);

    // Get all customers
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
        getCustomers();
    }, []);


    // Handle input
    const handleChange = (e) => {
        setCustomer({
            ...customer,
            [e.target.name]: e.target.value
        });
    };


    // Add / Update customer
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {

            if (editId === null) {

                // Add customer
                await axios.post(
                    "http://localhost:8080/customers",
                    customer
                );

                alert("Customer added successfully!");

            } else {

                // Update customer
                await axios.put(
                    `http://localhost:8080/customers/${editId}`,
                    customer
                );

                alert("Customer updated successfully!");

            }

            // Clear form
            setCustomer({
                name: "",
                email: "",
                phone: "",
                address: ""
            });

            setEditId(null);

            // Refresh list
            getCustomers();

        } catch (error) {

            console.error("Error saving customer:", error);
            alert("Operation failed!");

        }
    };


    // Edit customer
    const editCustomer = (c) => {

        setCustomer({
            name: c.name,
            email: c.email,
            phone: c.phone,
            address: c.address
        });

        setEditId(c.id);

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };


    // Delete customer
    const deleteCustomer = async (id) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this customer?"
        );

        if (!confirmDelete) {
            return;
        }

        try {

            await axios.delete(
                `http://localhost:8080/customers/${id}`
            );

            alert("Customer deleted successfully!");

            getCustomers();

        } catch (error) {

            console.error("Error deleting customer:", error);
            alert("Failed to delete customer!");

        }
    };


    // Cancel edit
    const cancelEdit = () => {

        setCustomer({
            name: "",
            email: "",
            phone: "",
            address: ""
        });

        setEditId(null);
    };


    return (
        <div className="customers-page">

            <div className="page-header">

                <h1>Customers</h1>

                <p>
                    Manage your vehicle service customers
                </p>

            </div>


            {/* Customer Form */}

            <div className="customer-form-card">

                <h2>
                    {editId === null
                        ? "Add Customer"
                        : "Edit Customer"}
                </h2>

                <form onSubmit={handleSubmit}>

                    <div className="form-row">

                        <div className="form-group">

                            <label>Name</label>

                            <input
                                type="text"
                                name="name"
                                value={customer.name}
                                onChange={handleChange}
                                placeholder="Enter customer name"
                                required
                            />

                        </div>


                        <div className="form-group">

                            <label>Email</label>

                            <input
                                type="email"
                                name="email"
                                value={customer.email}
                                onChange={handleChange}
                                placeholder="Enter email"
                                required
                            />

                        </div>

                    </div>


                    <div className="form-row">

                        <div className="form-group">

                            <label>Phone</label>

                            <input
                                type="text"
                                name="phone"
                                value={customer.phone}
                                onChange={handleChange}
                                placeholder="Enter phone number"
                                required
                            />

                        </div>


                        <div className="form-group">

                            <label>Address</label>

                            <input
                                type="text"
                                name="address"
                                value={customer.address}
                                onChange={handleChange}
                                placeholder="Enter address"
                                required
                            />

                        </div>

                    </div>


                    <button
                        type="submit"
                        className="add-button"
                    >
                        {editId === null
                            ? "+ Add Customer"
                            : "Update Customer"}
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


            {/* Customer List */}

            <div className="customer-list-card">

                <div className="list-header">

                    <h2>Customer List</h2>

                    <span>
                        Total: {customers.length}
                    </span>

                </div>


                <table>

                    <thead>

                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Address</th>
                            <th>Actions</th>
                        </tr>

                    </thead>


                    <tbody>

                        {customers.length === 0 ? (

                            <tr>

                                <td
                                    colSpan="6"
                                    className="no-data"
                                >
                                    No customers found
                                </td>

                            </tr>

                        ) : (

                            customers.map((c) => (

                                <tr key={c.id}>

                                    <td>{c.id}</td>

                                    <td>{c.name}</td>

                                    <td>{c.email}</td>

                                    <td>{c.phone}</td>

                                    <td>{c.address}</td>

                                    <td>

                                        <button
                                            className="edit-button"
                                            onClick={() =>
                                                editCustomer(c)
                                            }
                                        >
                                            Edit
                                        </button>

                                        <button
                                            className="delete-button"
                                            onClick={() =>
                                                deleteCustomer(c.id)
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

export default Customers;