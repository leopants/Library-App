import React, { useState, useEffect } from "react";
import "./Lists.css";
import "../NavBar/NavBar";
import Navbar from "../NavBar/NavBar";
import AddButtons from "../AddButtons/AddButtons";
import { Container, Image, Table, Toast, Spinner } from "react-bootstrap";
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
import PuffLoader from "react-spinners/PuffLoader";
require("firebase/compat/firestore");

export default function Lists() {
    const db = firebase.firestore();

    const { currentUser } = useAuth();
    const [bookArray, setBookArray] = useState([]);
    const [showB, setShowB] = useState(true);
    const [loading, setLoading] = useState(false)

    const toggleShowB = () => setShowB(!showB);

    useEffect(() => {
        async function fetchData() {
            setLoading(true)
            //get the lists belonging to a user
            const listQuery = await query(
                collection(db, "userlists"),
                where("useremail", "==", currentUser.email)
            );
            const listSnapshot = await getDocs(listQuery);
            
            //get the id of books from this list and save it in an array targetList
            var targetList = [];
            listSnapshot.forEach((userList) => {
                var bookIds = [];
                userList.data().books.forEach(listEntry => {
                    bookIds.push(listEntry.bookId)
                })
                targetList.push([userList.data().listname, bookIds])
            });

            //replace the ids with the actual book information and save it to the bookList array
            targetList.forEach((list) => {
                var bookInfoForList = [];
                list[1].forEach(async (singleBookId) => {
                    const docSnap = await getFirestoreDoc(singleBookId);
                    if (docSnap.exists()) {
                        bookInfoForList.push(docSnap.data());
                    }
                })
                setBookArray((prevArray) => [...prevArray, [list[0], bookInfoForList]]); //append the list name and the info for that list to the bookArray
            });
            setTimeout(() => { setLoading(false) }, 1000);
        }

        async function getFirestoreDoc(bookId) {
            const docRef = doc(db, "books", bookId);
            const docSnap = await getDoc(docRef);
            return docSnap;
        }
        fetchData();
    }, []);

    return (
        <div class="container-fluid g-0" style={{ padding: "0px" }}>
            <Navbar />
            <Container fluid>
                {loading === true &&
                    <div class="col-sm-12">
                        <div class="row justify-content-center g-0" style={{marginTop: "100px"}}>
                            <PuffLoader />
                        </div>
                    </div>
                }
                {loading === false &&
                    <div class="row justify-content-center g-0">
                        <div class="col-sm-2">
                            <div class="row justify-content-center g-0 mt-0">
                                <AddButtons />
                            </div>
                        </div>
                        
                        <div class="col-sm-9 mt-4">
                            {console.log(bookArray)}
                            {(bookArray).map((item, key) => {
                                if(item[1].length === 0) {
                                    return null
                                }
                                else {
                                return (
                                    <div key={key+1000}>
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
                                                    {(item[1]).map((indBook, secondKey) => {
                                                        return (
                                                            <td
                                                                key={secondKey + 10000}
                                                                style={{
                                                                    width: "350px !important",
                                                                }}
                                                            >
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
                                }
                            })}
                        </div>
                        <div class="col-sm-1"></div>
                    </div>
                }
            </Container>
        </div>
                
    );
}
