import React from "react";
import { Form, Button, Col, Row, Container, InputGroup } from "react-bootstrap";
import { KeyFill, PersonCircle } from "react-bootstrap-icons";
import { useHistory } from "react-router-dom";
import "./Login.css";
const axios = require("axios");

export default function Login(props) {
    const [usernameOrEmail, setusernameOrEmail] = React.useState("");
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
                            usernameOrEmail: usernameOrEmail,
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
        setusernameOrEmail("");
        setPassword("");
        event.preventDefault();
    };

    return (
        <div className="loginDiv">
            <Container fluid>
                <Row>
                    <Col xs={12}>
                        <Form className="loginForm" onSubmit={handleSubmit}>
                            <h1 className="loginText">Login</h1>
                            <Row>
                                <Col xs={{ span: 10, offset: 1 }}>
                                    <Form.Group controlId="formBasicEmail">
                                        <InputGroup>
                                            <InputGroup.Prepend>
                                                <InputGroup.Text>
                                                    <PersonCircle />
                                                </InputGroup.Text>
                                            </InputGroup.Prepend>
                                            <Form.Control
                                                value={usernameOrEmail}
                                                name="usernameOrEmail"
                                                type="text"
                                                placeholder="Username or email"
                                                onChange={(e) =>
                                                    setusernameOrEmail(
                                                        e.target.value
                                                    )
                                                }
                                                required
                                            />
                                        </InputGroup>
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={{ span: 10, offset: 1 }}>
                                    <Form.Group controlId="formBasicPassword">
                                        <InputGroup>
                                            <InputGroup.Prepend>
                                                <InputGroup.Text>
                                                    <KeyFill />
                                                </InputGroup.Text>
                                            </InputGroup.Prepend>
                                            <Form.Control
                                                name="password"
                                                value={password}
                                                type="password"
                                                placeholder="Password"
                                                onChange={(e) =>
                                                    setPassword(e.target.value)
                                                }
                                                required
                                            />
                                            {loginError === true && (
                                                <p className="errorP">
                                                    Your login credentials could
                                                    not be verified.
                                                </p>
                                            )}
                                        </InputGroup>
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={{ span: 10, offset: 1 }}>
                                    <Form.Group
                                        style={{ alignItems: "center" }}
                                    >
                                        <Button
                                            block
                                            className="loginButton"
                                            variant="primary"
                                            type="submit"
                                        >
                                            Submit
                                        </Button>
                                    </Form.Group>
                                </Col>
                            </Row>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}
