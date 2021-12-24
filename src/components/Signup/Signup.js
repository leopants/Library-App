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
import "./Signup.css";
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

export default function Signup(props) {
    const history = useHistory();

    const { signup } = useAuth();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState("");
    const firstNameRef = useRef();
    const lastNameRef = useRef();
    const usernameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmRef = useRef();

    const db = firebase.firestore();

    const handleSignUp = async (e) => {
        e.preventDefault();

        if (passwordRef.current.value !== passwordConfirmRef.current.value) {
            return setError("Passwords do not match");
        }

        try {
            setError("");
            setLoading(true);
            await signup(emailRef.current.value, passwordRef.current.value);
            await setDoc(doc(db, "users", usernameRef.current.value), {
                firstName: firstNameRef.current.value,
                lastName: lastNameRef.current.value,
                dob: "00/00/0000",
                username: usernameRef.current.value,
                email: emailRef.current.value,
            });
            history.push("/");
        } catch {
            setError("Unable to create an account");
        }
        setLoading(false);
    };

    const onGetBooks = async () => {
        try {
            const querySnapshot = await getDocs(collection(db, "books"));
            querySnapshot.forEach((doc) => {
                console.log(doc.id, " => ", doc.data());
            });
        } catch (error) {
            console.log(error);
        }
    };

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
                    <div class="row g-0 d-flex align-items-center">
                        <Card
                            style={{
                                border: "none",
                                borderRadius: "0px",
                                paddingTop: "6rem",
                                paddingLeft: "10%",
                                paddingRight: "10%",
                            }}
                        >
                            <Card.Body>
                                <h2
                                    className="text-center mb-4"
                                    style={{ fontSize: 32, fontWeight: 600 }}
                                >
                                    Sign Up
                                </h2>
                                {error && (
                                    <Alert variant="danger">{error}</Alert>
                                )}
                                <Form onSubmit={handleSignUp}>
                                    <Form.Group
                                        id="firstName"
                                        className="formGroup"
                                    >
                                        <Form.Label className="formLabel">
                                            First Name
                                        </Form.Label>
                                        <Form.Control
                                            style={{
                                                backgroundColor: "#f2dcb1",
                                                border: "none",
                                            }}
                                            type="text"
                                            ref={firstNameRef}
                                            required
                                        />
                                    </Form.Group>
                                    <Form.Group
                                        id="lastName"
                                        className="formGroup"
                                    >
                                        <Form.Label className="formLabel">
                                            Last Name
                                        </Form.Label>
                                        <Form.Control
                                            style={{
                                                backgroundColor: "#f2dcb1",
                                                border: "none",
                                            }}
                                            type="text"
                                            ref={lastNameRef}
                                            required
                                        />
                                    </Form.Group>
                                    <Form.Group
                                        id="username"
                                        className="formGroup"
                                    >
                                        <Form.Label className="formLabel">
                                            Username
                                        </Form.Label>
                                        <Form.Control
                                            style={{
                                                backgroundColor: "#f2dcb1",
                                                border: "none",
                                            }}
                                            type="text"
                                            ref={usernameRef}
                                            required
                                        />
                                    </Form.Group>
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
                                    <Form.Group
                                        id="password-confirm"
                                        className="formGroup"
                                    >
                                        <Form.Label className="formLabel">
                                            Confirm Password
                                        </Form.Label>
                                        <Form.Control
                                            style={{
                                                backgroundColor: "#f2dcb1",
                                                border: "none",
                                            }}
                                            type="password"
                                            ref={passwordConfirmRef}
                                            required
                                        />
                                    </Form.Group>
                                    <div
                                        class="mb-3"
                                        style={{
                                            display: "flex",
                                            justifyContent: "center",
                                        }}
                                    >
                                        <div style={{ color: "#4C70FF" }}>
                                            <Link
                                                style={{
                                                    textDecoration: "none",
                                                }}
                                                to="/login"
                                            >
                                                Already have an account? Log In
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
                            <div>
                                <Button onClick={onGetBooks}>Hello</Button>
                            </div>
                        </Card>
                    </div>
                </Col>
            </div>
        </Container>
    );
}
