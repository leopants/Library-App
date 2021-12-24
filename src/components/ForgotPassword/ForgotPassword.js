import React, { useRef, useState } from "react";
import { KeyFill, PersonCircle } from "react-bootstrap-icons";
import {
    Form,
    Button,
    Card,
    Alert,
    Row,
    Col,
    Container,
} from "react-bootstrap";
import logo from "../../logo.png";
import { useAuth } from "../../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";
import firebase from "firebase/compat/app";
import {
    collection,
    query,
    where,
    doc,
    getDoc,
    getDocs,
    setDoc,
} from "firebase/firestore";
require("firebase/compat/firestore");

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
        <Container
            fluid
            style={{
                height: "100vh",
                backgroundColor: "#fff",
                fontFamily: "Work Sans",
            }}
        >
            <div className="row g-0">
                <div
                    class="col-md-6 d-sm-none d-md-block"
                    style={{ backgroundColor: "#6A6363" }}
                ></div>
                <Col
                    style={{ height: "100vh" }}
                    md={{ span: 6, offset: 0 }}
                    sm={{ span: 12, offset: 0 }}
                >
                    <div class="row g-0 d-flex align-items-center mt-4">
                        <Card
                            style={{
                                border: "none",
                                borderRadius: "0px",
                                paddingTop: "12rem",
                                paddingLeft: "10%",
                                paddingRight: "10%",
                            }}
                        >
                            <Card.Body>
                                <h2 className="text-center mb-4">
                                    Password Reset
                                </h2>
                                {error && (
                                    <Alert variant="danger">{error}</Alert>
                                )}
                                {message && (
                                    <Alert variant="success">{message}</Alert>
                                )}
                                <Form onSubmit={handleSignUp}>
                                    <Form.Group id="email">
                                        <Form.Label
                                            style={{
                                                marginBottom: "4px",
                                                paddingBottom: "0px",
                                                fontWeight: "500",
                                            }}
                                        >
                                            Email
                                        </Form.Label>
                                        <Form.Control
                                            style={{
                                                backgroundColor: "#f2dcb1",
                                                border: "none",
                                            }}
                                            type="email"
                                            ref={emailRef}
                                            required
                                        />
                                    </Form.Group>

                                    <Button
                                        disable={loading}
                                        className="w-100 mt-4"
                                        type="submit"
                                        style={{
                                            borderRadius: "40px",
                                            backgroundColor: "#DC8920",
                                            borderWidth: "0px",
                                            padding: "10px",
                                        }}
                                    >
                                        Reset Password
                                    </Button>
                                </Form>
                                <div
                                    class="mb-3 mt-5"
                                    style={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                    }}
                                >
                                    <div style={{ color: "#4C70FF" }}>
                                        <Link
                                            style={{
                                                textDecoration: "none",
                                            }}
                                            to="/signup"
                                        >
                                            Need an account? Sign Up
                                        </Link>
                                    </div>
                                    <div style={{ color: "#4C70FF" }}>
                                        <Link
                                            style={{
                                                textDecoration: "none",
                                            }}
                                            to="/login"
                                        >
                                            Have an account? Login
                                        </Link>
                                    </div>
                                </div>
                            </Card.Body>
                        </Card>
                    </div>
                </Col>
            </div>
            {/* 
            <div className="row g-0">
                <div
                    class="col-md-6 d-sm-none d-md-block"
                    style={{ backgroundColor: "#6A6363" }}
                ></div>
                <Col
                    style={{ height: "100vh" }}
                    md={{ span: 6, offset: 0 }}
                    sm={{ span: 12, offset: 0 }}
                >
                    <div class="row g-0 d-flex align-items-center">
                        <Card
                            style={{
                                border: "none",
                                borderRadius: "0px",
                                paddingTop: "12rem",
                                paddingLeft: "10%",
                                paddingRight: "10%",
                            }}
                        >
                            <Card.Body>
                                <h2
                                    className="text-center mb-4"
                                    style={{ fontSize: 32, fontWeight: 600 }}
                                >
                                    Login
                                </h2>
                                {error && (
                                    <Alert variant="danger">{error}</Alert>
                                )}
                                <Form onSubmit={handleSignUp}>
                                    <Form.Group
                                        id="email"
                                        className="formGroup"
                                    >
                                        <Form.Label className="formLabel">
                                            Email
                                        </Form.Label>
                                        <Form.Control
                                            style={{
                                                backgroundColor: "#f2dcb1",
                                                border: "none",
                                            }}
                                            type="email"
                                            ref={emailRef}
                                            required
                                        />
                                    </Form.Group>
                                    <Form.Group
                                        id="password"
                                        className="formGroup"
                                    >
                                        <Form.Label className="formLabel">
                                            Password
                                        </Form.Label>
                                        <Form.Control
                                            style={{
                                                backgroundColor: "#f2dcb1",
                                                border: "none",
                                            }}
                                            type="password"
                                            ref={passwordRef}
                                            required
                                        />
                                    </Form.Group>

                                    <div
                                        class="mb-3"
                                        style={{
                                            display: "flex",
                                            justifyContent: "space-between",
                                        }}
                                    >
                                        <div style={{ color: "#4C70FF" }}>
                                            <Link
                                                style={{
                                                    textDecoration: "none",
                                                }}
                                                to="/login"
                                            >
                                                Need an account? Sign Up
                                            </Link>
                                        </div>
                                        <div style={{ color: "#4C70FF" }}>
                                            <Link
                                                style={{
                                                    textDecoration: "none",
                                                }}
                                                to="/login"
                                            >
                                                Forgot Password?
                                            </Link>
                                        </div>
                                    </div>
                                    <Button
                                        disable={loading}
                                        style={{
                                            borderRadius: "40px",
                                            backgroundColor: "#DC8920",
                                            borderWidth: "0px",
                                            padding: "10px",
                                        }}
                                        className="w-100 mt-2"
                                        type="submit"
                                    >
                                        Sign Up
                                    </Button>
                                </Form>
                            </Card.Body>
                        </Card>
                    </div>
                </Col>
            </div>
        </Container> */}
        </Container>
    );
}
