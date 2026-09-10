import { useState } from "react";
import { useNavigate } from "react-router-dom";

import "./Login.css";

function Login() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const handleLogin = (e) => {

        e.preventDefault();

        console.log("Username:", username);
        console.log("Password:", password);

        if (username === "admin" && password === "admin123") {

            console.log("Login successful");

            navigate("/dashboard");

        } else {

            alert("Invalid username or password!");

        }
    };

    return (
        <div className="login-page">

            <div className="login-card">

                <div className="login-icon">
                    <i class="fa-solid fa-user-lock"></i>
                </div>

                <h1>Vehicle Service</h1>

                <p className="login-subtitle">
                    Admin Login
                </p>

                <form onSubmit={handleLogin}>

                    <div className="login-form-group">

                        <label>Username</label>

                        <input
                            type="text"
                            placeholder="Enter username"
                            value={username}
                            onChange={(e) =>
                                setUsername(e.target.value)
                            }
                            required
                        />

                    </div>

                    <div className="login-form-group">

                        <label>Password</label>

                        <input
                            type="password"
                            placeholder="Enter password"
                            value={password}
                            onChange={(e) =>
                                setPassword(e.target.value)
                            }
                            required
                        />

                    </div>

                    <button
                        type="submit"
                        className="login-button"
                    >
                        Login
                    </button>

                </form>

                <p style={{ marginTop: "20px", fontSize: "13px" }}>
                    Test Login: admin / admin123
                </p>

            </div>

        </div>
    );
}

export default Login;