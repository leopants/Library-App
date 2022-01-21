import React, { useState, useEffect } from "react";
import { MDBContainer, MDBRow, MDBCol } from "mdb-react-ui-kit";
import { Link, useHistory } from "react-router-dom";
import "./Profile.css";
import "../NavBar/NavBar";
import Navbar from "../NavBar/NavBar";
import ReadingItem from "../ReadingItem/ReadingItem";
import { Button } from "react-bootstrap";
import { useAuth } from "../../contexts/AuthContext";
import firebase from "firebase/compat/app";
import {
    collection,
    query,
    where,
    getDocs,
    updateDoc,
    addDoc,
    doc,
    getDoc,
} from "firebase/firestore";
require("firebase/compat/firestore");
const axios = require("axios");

export default function Dashboard() {
    const db = firebase.firestore();

    const [error, setError] = useState("");
    const [userFirstName, setUserFirstName] = useState("");
    const { currentUser, logout } = useAuth();
    const history = useHistory();

    useEffect(() => {
        async function fetchData() {
            const q = await query(
                collection(db, "users"),
                where("email", "==", currentUser.email)
            );
            const querySnapshot = await getDocs(q);
            var targetList = [];
            querySnapshot.forEach((doc) => {
                setUserFirstName(doc.data().firstName)
                
            });
        }
        fetchData();
    }, []);

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
                        <div style={{marginTop: "30px"}}>
                            <p style={{textAlign: "center", fontSize: "28px", fontWeight: 600}}>{userFirstName}</p>
                            <p style={{textAlign: "center", fontSize: "18px", fontWeight: 400}}>{currentUser.email}</p>
                            
                        </div>
                        {console.log(currentUser)}
                        <Button variant="link" onClick={handleLogout}>
                            Log Out
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
