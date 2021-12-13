import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import "./FriendsList.css";
import "../NavBar/NavBar";
import NavBar from "../NavBar/NavBar";
import ReadingItem from "../ReadingItem/ReadingItem";
import FriendsListItem from "../FriendsListItem/FriendsListItem";
import { Button, Container, Row } from "react-bootstrap";
import { useAuth } from "../../contexts/AuthContext";
const axios = require("axios");

export default function FriendsList() {
    const [error, setError] = useState("");
    const { currentUser, logout } = useAuth();
    const history = useHistory();

    return (
        <div>
            <div
                class="row justify-content-center g-0 mt-0"
                style={{
                    fontSize: "24px",
                    fontWeight: "600",
                    fontFamily: "Work Sans",
                }}
            >
                Friends Nook
            </div>
            <div class="row justify-content-center g-0 mt-5">
                <div class="row justify-content-center g-0 mt-0">
                    <FriendsListItem />
                    <FriendsListItem />
                    <FriendsListItem />
                    <FriendsListItem />
                    <FriendsListItem />
                    <FriendsListItem />
                    <FriendsListItem />
                    <FriendsListItem />
                    <FriendsListItem />
                </div>
            </div>
        </div>
    );
}
