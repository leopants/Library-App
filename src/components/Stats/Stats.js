import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import "./Stats.css";
import "../NavBar/NavBar";
import Navbar from "./src/components/NavBar/NavBar.js";
import ReadingItem from "../ReadingItem/ReadingItem.js";
import { Button } from "react-bootstrap";
import { useAuth } from "../../contexts/AuthContext";
import firebase from "firebase/compat/app";
import {
    collection,
    query,
    where,
    doc,
    getDoc,
    getDocs,
} from "firebase/firestore";
import StatsDashboard from "../StatsDashboard/StatsDashboard";
require("firebase/compat/firestore");
const axios = require("axios");

export default function Stats() {
    const db = firebase.firestore();

    const [error, setError] = useState("");
    const { currentUser, logout } = useAuth();
    const [listArray, setListArray] = useState([]);
    const [allUsersLists, setAllUsersLists] = useState([]);
    const [currentList, setCurrentList] = useState([]);
    const history = useHistory();

    useEffect(() => {
        async function fetchData() {
            const listQuery = await query(
                collection(db, "userlists"),
                where("useremail", "==", currentUser.email)
            );
            const listSnapshot = await getDocs(listQuery);
            var listNameHolder = [];
            var allListsHolder = [];
            listSnapshot.forEach((userList) => {
                listNameHolder.push(userList.data().listname);
                allListsHolder.push(userList.data());
            });
            setListArray([...listNameHolder]);
            setAllUsersLists([...allListsHolder]);
            setCurrentList(listSnapshot.docs[0].data());
        }
        fetchData();
    }, []);

    const changeList = async (selectedListName) => {
        allUsersLists.forEach((indList) => {
            if (indList.listname === selectedListName) {
                setCurrentList(indList);
            }
        });
    };

    const isActiveButton = (item) => {
        if (item === currentList.listname) {
            return "#FFFFFA";
        } else {
            return "#F3E9D4";
        }
    };

    return (
        <div class="container-fluid g-0" style={{ padding: "0px" }}>
            <Navbar />
            <div class="row justify-content-center g-0">
                <h1
                    className="greeting"
                    class="d-flex justify-content-center m-3"
                    style={{
                        fontSize: "32px",
                        fontWeight: "600",
                        fontFamily: "Work Sans",
                    }}
                >
                    Stats
                </h1>
                <div class="col-sm-3">
                    <div class="ms-5">
                        <h2 style={{ fontWeight: "600", marginBottom: "35px" }}>
                            Lists
                        </h2>
                        {listArray.map((item, i) => {
                            return (
                                <Button
                                    style={{
                                        backgroundColor: isActiveButton(item),
                                        borderRadius: "25px",
                                        border: "none",
                                        width: "70%",
                                        marginBottom: "10px",
                                        color: "black",
                                        textAlign: "start",
                                        fontSize: "24px",
                                        fontWeight: "600",
                                        paddingLeft: "20px",
                                    }}
                                    onClick={() => changeList(item)}
                                >
                                    {item}
                                </Button>
                            );
                        })}
                    </div>
                </div>
                <div class="col-sm-9">
                    <StatsDashboard currentList={currentList} />
                </div>
            </div>
        </div>
    );
}
