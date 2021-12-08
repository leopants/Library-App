import React, { useRef, useState } from "react";
import { KeyFill, PersonCircle } from "react-bootstrap-icons";
import { Form, Button, Card, Alert } from "react-bootstrap";
import logo from "../../logo.png";
import { useAuth } from "../../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";

const axios = require("axios");

export default function ForgotPassword(props) {
    const [email, setEmail] = React.useState("");
    const [username, setUserName] = React.useState("");
    const [firstName, setFirstName] = React.useState("");
    const [lastName, setLastName] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [loginError, setLoginError] = React.useState(false);
    const history = useHistory();

    const { resetPassword } = useAuth();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState("");
    const emailRef = useRef();
    const [message, setMessage] = React.useState("");

    const handleSignUp = async (e) => {
        e.preventDefault();

        try {
            setError("");
            setLoading(true);
            await resetPassword(emailRef.current.value);
            setMessage("Check your inbox for further intructions");
        } catch {
            setError("Failed to reset password");
        }
        setLoading(false);
    };

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
        <>
            <Card>
                <Card.Body>
                    <h2 className="text-center mb-4">Password Reset</h2>
                    {error && <Alert variant="danger">{error}</Alert>}
                    {message && <Alert variant="success">{message}</Alert>}
                    <Form onSubmit={handleSignUp}>
                        <Form.Group id="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                ref={emailRef}
                                required
                            />
                        </Form.Group>

                        <Button
                            disable={loading}
                            className="w-100 mt-2"
                            type="submit"
                        >
                            Reset Password
                        </Button>
                    </Form>
                    <div className="w-100 text-center mt-3">
                        <Link to="/login">Login</Link>
                    </div>
                </Card.Body>
            </Card>
            <div className="w-100 text-center mt-2">
                Need an account? <Link to="/signup">Sign up</Link>
            </div>
        </>
    );
}
