import React, { useState, useEffect } from "react";
import {  useHistory } from "react-router-dom";
import "./Profile.css";
import Navbar from "../NavBar/NavBar.js";
import { Button } from "react-bootstrap";
import { useAuth } from "../../contexts/AuthContext";
import firebase from "firebase/compat/app";
import {
    collection,
    query,
    where,
    getDocs,
} from "firebase/firestore";
require("firebase/compat/firestore");

export default function Dashboard() {
    const db = firebase.firestore();

    const [error, setError] = useState("");
    const [userFirstName, setUserFirstName] = useState("");
    const { currentUser } = useAuth();
    const history = useHistory();

    useEffect(() => {
        async function fetchData() {
            const q = await query(
                collection(db, "users"),
                where("email", "==", currentUser.email)
            );
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                setUserFirstName(doc.data().firstName)
            });
        }
        fetchData();
    }, []);

    async function handleLogout() {
        setError("");
        try {
            //await logout();
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
                        <div class="text-center" style={{marginTop: "30px"}}>
                            <p style={{fontSize: "28px", fontWeight: 600}}>{userFirstName}</p>
                            <p style={{fontSize: "18px", fontWeight: 400}}>{currentUser.email}</p>
                            <Button style={{
                                color: "black",
                                backgroundColor: "#FFFFFA",
                                border: "0px",
                                width: "100px",
                                borderRadius: "17px",
                                padding: "5px",
                                boxShadow: "0px 0px 26px rgba(0,0,0,.20)",
                            }} onClick={handleLogout}>
                                Log Out
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
