import React, { useState } from "react";
import { MDBContainer, MDBRow, MDBCol } from "mdb-react-ui-kit";
import { Link, useHistory } from "react-router-dom";
import "./Profile.css";
import "../NavBar/NavBar";
import Navbar from "../NavBar/NavBar";
import ReadingItem from "../ReadingItem/ReadingItem";
import { Button } from "react-bootstrap";
import { useAuth } from "../../contexts/AuthContext";
const axios = require("axios");

export default function Dashboard() {
    const [error, setError] = useState("");
    const { currentUser, logout } = useAuth();
    const history = useHistory();

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
            <Navbar />
            <div class="row justify-content-center g-0">
                <div class="col-sm-6">
                    <div>
                        <Button variant="link" onClick={handleLogout}>
                            Log Out
                        </Button>
                    </div>
                    <div className="col-example">
                        <ReadingItem />
                    </div>
                    <div className="col-example">
                        <ReadingItem />
                    </div>
                    <div className="col-example">
                        <ReadingItem />
                    </div>
                    <div className="col-example">
                        <ReadingItem />
                    </div>
                </div>
            </div>
        </div>
    );
}
