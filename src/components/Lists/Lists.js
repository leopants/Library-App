import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import "./Lists.css";
import "../NavBar/NavBar";
import Navbar from "../NavBar/NavBar";
import AddButtons from "../AddButtons/AddButtons";
import { Container, Image, Table } from "react-bootstrap";
import BookCard from "../BookCard/BookCard";
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

export default function Dashboard() {
    const db = firebase.firestore();

    const [error, setError] = useState("");
    const { currentUser, logout } = useAuth();
    const [bookArray, setBookArray] = useState(new Map());
    const history = useHistory();

    useEffect(() => {
        async function fetchData() {
            const listQuery = await query(
                collection(db, "userlists"),
                where("useremail", "==", currentUser.email)
            );
            const listSnapshot = await getDocs(listQuery);
            
            var targetList = new Map();
            listSnapshot.forEach((userList) => {
                var bookIds = [];
                userList.data().books.forEach(listEntry => {
                    bookIds.push(listEntry.bookId)
                })
                targetList.set(userList.data().listname, bookIds)
            });
            //do this with an iterator instead see wtf happens then i guess
            //lord knows what the fuck I'm doing at the moment
            var bookList = new Map();
            targetList.forEach(async (list, key) => {
                var bookInfoForList = [];
                list.forEach(async (singleBookId) => {
                    const docSnap = await getFirestoreDoc(singleBookId);
                    if (docSnap.exists()) {
                        bookInfoForList.push(docSnap.data());
                        //setBookArray((prevArray) => [...prevArray, bookList]); //idk man please remember this has to do with keeping prevArray
                    }
                })
                bookList.set(key, bookInfoForList)
            });
            setBookArray(bookList);
        }

        async function getFirestoreDoc(bookId) {
            const docRef = doc(db, "books", bookId);
            const docSnap = await getDoc(docRef);
            return docSnap;
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
            <Container fluid>
                <div class="row justify-content-center g-0">
                    <div class="col-sm-2">
                        <div class="row justify-content-center g-0 mt-0">
                            <AddButtons />
                        </div>
                    </div>
                    
                    <div class="col-sm-10 mt-4">
                        {Array.from(bookArray).map((item, key) => {
                            return (
                                <div key={key.id}>
                                    <div
                                        class="row justify-content-center g-0 mt-0 mb-2"
                                        style={{
                                            fontSize: "24px",
                                            fontWeight: "600",
                                            fontFamily: "Work Sans",
                                        }}
                                    >

                                        <p>{item[0]}</p>
                                    </div>
                                    <Table responsive borderless>
                                        <tbody>
                                            <tr>
                                                {Array.from(item[1]).map((indBook, secondKey) => {
                                                    return (
                                                        <td
                                                            key={secondKey.id}
                                                            style={{
                                                                width: "350px !important",
                                                            }}
                                                        >
                                                            {console.log(indBook)}
                                                            <BookCard
                                                                author={indBook.author}
                                                                title={indBook.title}
                                                                pageCount={indBook.pageCount}
                                                                imageLink={indBook.imageLink}
                                                            />
                                                        </td>
                                                    );
                                                })}
                                            </tr>
                                        </tbody>
                                    </Table>
                                    <Image fluid src={shelf}></Image>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </Container>
        </div>
                
    );
}
