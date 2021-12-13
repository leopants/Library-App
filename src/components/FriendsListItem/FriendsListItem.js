import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import "../NavBar/NavBar";
import NavBar from "../NavBar/NavBar";
import ReadingItem from "../ReadingItem/ReadingItem";
import { Button, Container, Row, Card } from "react-bootstrap";
import { useAuth } from "../../contexts/AuthContext";
import logo from "../../logo.png";
import mypic from "../../profpic.jpg";
import { logRoles } from "@testing-library/react";
const axios = require("axios");

export default function FriendsListItem(friendsName, date, status, bookTitle) {
    const [error, setError] = useState("");
    const { currentUser, logout } = useAuth();
    const history = useHistory();
    friendsName = "Jane";
    date = "4/14/2021";
    status = "Started";
    bookTitle = "To Kill a Mockingbird";

    return (
        <div>
            <div class="row justify-content-center g-0 mt-0 ms-5 me-5 mb-4">
                <Card
                    style={{
                        flexDirection: "row",
                        border: "none",
                        backgroundColor: "#F3E9D4",
                    }}
                >
                    <Card.Img
                        src={mypic}
                        fluid
                        style={{
                            width: "70px",
                            height: "70px",
                            borderRadius: "50px",
                            objectFit: "cover",
                        }}
                    />
                    <Card.Body style={{ padding: "0px", paddingLeft: "15px" }}>
                        <Card.Text
                            style={{
                                fontSize: "14px",
                                fontFamily: "Work Sans",
                                fontWeight: 300,
                                margin: "0px",
                                lineHeight: "1rem",
                            }}
                        >
                            {date}
                        </Card.Text>
                        <Card.Text
                            style={{
                                fontSize: "14px",
                                fontFamily: "Work Sans",
                                fontWeight: 300,
                                margin: "0px",
                            }}
                        >
                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "flex-start",
                                }}
                            >
                                <p
                                    style={{
                                        fontSize: "20px",
                                        fontFamily: "Work Sans",
                                        fontWeight: 500,
                                        margin: "0px",
                                        alignSelf: "flex-end",
                                    }}
                                >
                                    {friendsName}&nbsp;{" "}
                                </p>
                                <p
                                    style={{
                                        fontSize: "14px",
                                        fontFamily: "Work Sans",
                                        fontWeight: 300,
                                        margin: "0px",
                                        alignSelf: "center",
                                        paddingTop: "3px",
                                    }}
                                >
                                    {status}
                                </p>
                            </div>
                        </Card.Text>
                        <Card.Text
                            style={{
                                fontSize: "17px",
                                fontFamily: "Work Sans",
                                fontWeight: 400,
                                margin: "0px",
                            }}
                        >
                            {bookTitle}
                        </Card.Text>
                    </Card.Body>
                </Card>
            </div>
        </div>
    );
}
