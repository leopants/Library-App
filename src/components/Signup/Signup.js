import React from "react";
import { KeyFill, PersonCircle } from "react-bootstrap-icons";
import { useHistory } from "react-router-dom";
import "./Signup.css";
import logo from "../../logo.png";
const axios = require("axios");

export default function Signup(props) {
    const [email, setEmail] = React.useState("");
    const [username, setUserName] = React.useState("");
    const [firstName, setFirstName] = React.useState("");
    const [lastName, setLastName] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [loginError, setLoginError] = React.useState(false);
    const history = useHistory();

    const handleSubmit = (event) => {
        try {
            axios
                .get(
                    "https://ponk-backend-rbk23.ondigitalocean.app/checkuser",
                    {
                        params: {
                            username: username,
                            password: password,
                        },
                    }
                )
                .then(function (response) {
                    if (response.request.status == 200) {
                        console.log(response.data[0].firstName); //getting name from backend to interact with the user
                        props.callback(response.data[0].firstName);
                        history.push("/dashboard"); //redirect to dashboard if log in successful
                    }
                })
                .catch(function (error) {
                    if (error.response) {
                        // Request made and server responded
                        setLoginError(true);
                    } else if (error.request) {
                        // The request was made but no response was received
                        console.log(error.request);
                    } else {
                        // Something happened in setting up the request that triggered an Error
                        console.log("Error", error.message);
                    }
                });
        } catch (err) {
            //should never really get here
            console.log(err);
        }
        setUserName("");
        setPassword("");
        event.preventDefault();
    };

    const handleRegisterNeeded = (event) => {};

    return (
        <div className="loginDiv" style={{ marginTop: "5%" }}>
            <div class="container-fluid" className="loginDiv">
                <div class="col" className="mainCol">
                    <img src={logo} className="App-logo" alt="logo" />
                    <form className="loginForm" onSubmit={handleSubmit}>
                        <div class="col-6 offset-3">
                            <h1 className="loginText">Signup</h1>
                        </div>

                        <div class="row">
                            <div class="col">
                                <input
                                    style={{ margin: "2%" }}
                                    autoComplete="no"
                                    value={firstName}
                                    name="firstName"
                                    type="text"
                                    placeholder="First Name"
                                    onChange={(e) =>
                                        setFirstName(e.target.value)
                                    }
                                    required
                                />
                            </div>
                        </div>
                        <div class="row">
                            <div class="col">
                                <input
                                    contrast
                                    style={{ margin: "2%" }}
                                    autoComplete="no"
                                    value={lastName}
                                    name="lastName"
                                    type="text"
                                    placeholder="Last Name"
                                    onChange={(e) =>
                                        setLastName(e.target.value)
                                    }
                                    required
                                />
                            </div>
                        </div>
                        <div class="row">
                            <div class="col">
                                <input
                                    contrast
                                    style={{ margin: "2%" }}
                                    autoComplete="no"
                                    value={username}
                                    name="username"
                                    type="text"
                                    placeholder="Username"
                                    onChange={(e) =>
                                        setUserName(e.target.value)
                                    }
                                    required
                                />
                            </div>
                        </div>
                        <div class="row">
                            <div class="col">
                                <input
                                    contrast
                                    style={{ margin: "2%" }}
                                    autoComplete="no"
                                    value={email}
                                    name="email"
                                    type="text"
                                    placeholder="Email"
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                        </div>
                        <div class="row">
                            <div class="col">
                                <input
                                    contrast
                                    style={{ margin: "2%" }}
                                    name="password"
                                    value={password}
                                    type="password"
                                    placeholder="Password"
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                    required
                                />
                            </div>
                        </div>
                        <div class="row justify-content-center">
                            <div class="col">
                                <div class="d-grid gap-2">
                                    <button
                                        className="loginButton"
                                        variant="primary"
                                        type="submit"
                                    >
                                        Submit
                                    </button>
                                </div>
                            </div>
                        </div>
                    </form>
                    <form className="loginForm" onSubmit={handleRegisterNeeded}>
                        <div class="row">
                            <div class="col">
                                <div class="d-grid gap-2">
                                    <button
                                        block
                                        className="registerButton"
                                        variant="primary"
                                        type="submit"
                                    >
                                        Have an account? Login
                                    </button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
