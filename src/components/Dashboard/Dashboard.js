import React, { useState, useEffect, useLayoutEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import "./Dashboard.css";
import "../NavBar/NavBar";
import NavBar from "../NavBar/NavBar";
import AddButtons from "../AddButtons/AddButtons";
import FriendsList from "../FriendsList/FriendsList";
import BookCard from "../BookCard/BookCard";
import { Button, Container, Image, Table } from "react-bootstrap";
import { useAuth } from "../../contexts/AuthContext";
import shelf from "../../Top Shelf.svg";
import firebase from "firebase/compat/app";
import {
    collection,
    query,
    where,
    doc,
    getDoc,
    getDocs,
} from "firebase/firestore";
require("firebase/compat/firestore");
const axios = require("axios");

export default function Dashboard() {
    const db = firebase.firestore();
    const { currentUser, logout } = useAuth();

    const [userFirstName, setUserFirstName] = useState("");
    const [error, setError] = useState("");
    const [bookArray, setBookArray] = useState([]);
    const history = useHistory();
    let isAM = true;
    var today = new Date();
    var time = today.getHours();

    useEffect(() => {
        async function fetchData() {
            const q = await query(
                collection(db, "users"),
                where("email", "==", currentUser.email)
            );
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                setUserFirstName(doc.data().firstName);
            });

            const listQuery = await query(
                collection(db, "userlists"),
                where("useremail", "==", currentUser.email)
            );
            const listSnapshot = await getDocs(listQuery);
            var targetList;
            listSnapshot.forEach((userList) => {
                if (userList.data().listname == "Reading List") {
                    targetList = userList.data().books;
                }
            });

            var bookList = [];
            targetList.forEach(async (book) => {
                const docSnap = await getFirestoreDoc(book.bookId);
                if (docSnap.exists()) {
                    bookList.push(docSnap.data());
                    //setBookArray((prevArray) => [...prevArray, bookList]); //idk man please remember this has to do with keeping prevArray

                    setBookArray([...bookList]);
                }
            });
        }

        async function getFirestoreDoc(bookId) {
            const docRef = doc(db, "books", bookId);
            const docSnap = await getDoc(docRef);
            return docSnap;
        }
        fetchData();
    }, []);

    function getGreeting(time) {
        if (time < 12) {
            isAM = true;
        } else isAM = false;
        return isAM;
    }

    async function getAPIBook(title, authorFirst, authorLast) {
        title = "the shining";
        authorFirst = "stephen";
        let url =
            "https://www.googleapis.com/books/v1/volumes?q=inauthor:" +
            authorFirst +
            "+intitle:" +
            title +
            "&key=AIzaSyBA-Q3JKT8Y8qJ2Aw7V4oSJTCDT-CiOsAM";
        axios
            .get(url)
            .then((response) => console.log(response.data.items[0].volumeInfo));
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
                        Good Morning, {userFirstName}!
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
                        Good Afternoon, {userFirstName}!
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
                                    {console.log(bookArray)}
                                    {bookArray.map((item, i) => {
                                        return (
                                            <td
                                                key={i}
                                                style={{
                                                    width: "350px !important",
                                                }}
                                            >
                                                <BookCard
                                                    author={item.author}
                                                    title={item.title}
                                                    pageCount={item.pageCount}
                                                    imageLink={item.imageLink}
                                                />
                                            </td>
                                        );
                                    })}
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
                    </div>
                    <div class="col-sm-3">
                        <FriendsList />
                    </div>
                </div>
            </Container>
        </div>
    );
}
