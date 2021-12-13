import React, { useState, useEffect, useLayoutEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import "./Dashboard.css";
import "../NavBar/NavBar";
import NavBar from "../NavBar/NavBar";
import AddButtons from "../AddButtons/AddButtons";
import ReadingItem from "../ReadingItem/ReadingItem";
import FriendsList from "../FriendsList/FriendsList";
import BookCard from "../BookCard/BookCard";
import { Button, Container, Row, Image, Table } from "react-bootstrap";
import { useAuth } from "../../contexts/AuthContext";
import shelf from "../../Top Shelf.svg";
import { FileEaselFill } from "react-bootstrap-icons";
const axios = require("axios");

export default function Dashboard() {
    const [error, setError] = useState("");
    const { currentUser, logout } = useAuth();
    const history = useHistory();
    let isAM = true;
    var today = new Date();
    var time = today.getHours();
    console.log(time);

    function getGreeting(time) {
        if (time < 12) {
            isAM = true;
        } else isAM = false;
        return isAM;
    }

    async function getBookCover(bookISBN) {
        let url = "https://covers.openlibrary.org/b/isbn/";
        url = url + bookISBN + "-M.jpg";
        let bookCoverImage = axios
            .get(url, {
                responseType: "arraybuffer",
            })
            .then((response) =>
                Buffer.from(response.data, "binary").toString("base64")
            );
    }

    async function handleLogout() {
        setError("");

        try {
            await logout();
            history.push("/login");
        } catch (logoutError) {
            setError("Failed to log out");
        }
        console.log(error);
    }

    return (
        <div class="container-fluid g-0" style={{ padding: "0px" }}>
            <NavBar />
            <Container fluid>
                {getGreeting() == true && (
                    <p
                        className="greeting"
                        class="d-flex justify-content-center m-4"
                        style={{
                            fontSize: "32px",
                            fontWeight: "600",
                            fontFamily: "Work Sans",
                        }}
                    >
                        Good Morning, Leo!
                    </p>
                )}
                {getGreeting() == false && (
                    <p
                        className="greeting"
                        class="d-flex justify-content-center m-4"
                        style={{
                            fontSize: "32px",
                            fontWeight: "600",
                            fontFamily: "Work Sans",
                        }}
                    >
                        Good Afternoon, Leo!
                    </p>
                )}
                <div class="row justify-content-center g-0">
                    <div class="col-sm-2">
                        <div class="row justify-content-center g-0 mt-0">
                            <AddButtons />
                        </div>
                    </div>
                    <div class="col-sm-7">
                        <div
                            class="row justify-content-center g-0 mt-0 mb-2"
                            style={{
                                fontSize: "24px",
                                fontWeight: "600",
                                fontFamily: "Work Sans",
                            }}
                        >
                            <p>Currently Reading</p>
                        </div>
                        <Table responsive borderless>
                            <tbody>
                                <tr>
                                    <td>
                                        <BookCard />
                                    </td>

                                    <td>
                                        <BookCard />
                                    </td>
                                    <td>
                                        <BookCard />
                                    </td>
                                    <td>
                                        <BookCard />
                                    </td>
                                </tr>
                            </tbody>
                        </Table>
                        <Image fluid src={shelf}></Image>
                        <div className="col-example">
                            <div
                                class="row justify-content-center g-0 mt-0"
                                style={{
                                    fontSize: "24px",
                                    fontWeight: "600",
                                    fontFamily: "Work Sans",
                                }}
                            >
                                <p>Recommended</p>
                            </div>
                            <Table responsive borderless>
                                <tbody>
                                    <tr>
                                        <td>
                                            <BookCard />
                                        </td>

                                        <td>
                                            <BookCard />
                                        </td>
                                        <td>
                                            <BookCard />
                                        </td>
                                        <td>
                                            <BookCard />
                                        </td>
                                    </tr>
                                </tbody>
                            </Table>

                            <Image fluid src={shelf}></Image>
                        </div>

                        <div>
                            <Button variant="link" onClick={handleLogout}>
                                Log Out
                            </Button>
                        </div>
                    </div>
                    <div class="col-sm-3">
                        <FriendsList />
                    </div>
                </div>
            </Container>
        </div>
    );
}
