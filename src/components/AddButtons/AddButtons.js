import React, { useState, useRef, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import "./AddButtons.css";
import "../NavBar/NavBar";
import { Button, Container, Row, Col, Form } from "react-bootstrap";
import { useAuth } from "../../contexts/AuthContext";
import firebase from "firebase/compat/app";
import {
    collection,
    query,
    where,
    getDocs,
    updateDoc,
    arrayUnion,
    addDoc,
} from "firebase/firestore";
require("firebase/compat/firestore");
const axios = require("axios");

export default function AddButtons() {
    const db = firebase.firestore();

    const [error, setError] = useState("");
    const { currentUser, logout } = useAuth();
    const [shelfArray, setShelfArray] = useState([]);
    const [checkedShelves, setCheckedShelves] = useState([]);
    const titleRef = useRef();
    const authorsNameRef = useRef();
    const history = useHistory();

    useEffect(() => {
        async function fetchData() {
            const q = await query(
                collection(db, "users"),
                where("email", "==", currentUser.email)
            );
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                var targetList = [];
                doc.data().lists.forEach((element) => {
                    targetList.push(element.listName);
                });
                setShelfArray(targetList);
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

    async function handleAddBook() {
        try {
            titleRef.current.value = capitalizeText(titleRef.current.value);
            authorsNameRef.current.value = capitalizeText(
                authorsNameRef.current.value
            );
            //get the user's info
            const q = await query(
                collection(db, "users"),
                where("email", "==", currentUser.email)
            );
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach(async (doc) => {
                const bookQuery = await query(
                    collection(db, "books"),
                    where("volumeInfo.title", "==", titleRef.current.value),
                    where(
                        "volumeInfo.author",
                        "==",
                        authorsNameRef.current.value
                    )
                );

                //see if the book already exists
                const docSnap = await getDocs(bookQuery);
                //book does not exist in the database so lets create it from the google api and link it
                if (docSnap.empty == true) {
                    const volumeInfo = await getBookFromGoogle(
                        titleRef.current.value,
                        authorsNameRef.current.value
                    );
                    addBookToFireStore(volumeInfo.items[0].volumeInfo);
                } else {
                    //book exists in the books database, create the link between the book to that user's selected lists
                    const bookId = docSnap.docs[0].id; //get the book id
                    const usersLists = doc.data().lists; //get the users lists and match a list to those of checkedShelves
                    usersLists.forEach((list, i) => {
                        if (checkedShelves.includes(list.listName)) {
                            //if the name of the list is selected then add the book to that list with the proper params
                            //this checks if the book is already in the selected list if it is then return nothing, idk if to alert the user
                            var bookAlreadyExists = false;
                            list.books.forEach(async (individualBook) => {
                                if (
                                    individualBook.bookId == docSnap.docs[0].id
                                ) {
                                    //this if means that the book is contained within list.books , which is the users book list then do nothing and set bookAlreadyExists to true

                                    bookAlreadyExists = true;
                                } else {
                                    //this else means that the book isn't there so add the book to the user
                                    var completed = false;
                                    var currentPage = 0;
                                    var currentBookId = individualBook.bookId;
                                    var today = new Date();
                                    var startedOn =
                                        1 +
                                        today.getMonth() +
                                        "-" +
                                        today.getDate() +
                                        "-" +
                                        today.getFullYear();

                                    console.log(doc.data().lists);
                                    console.log("noiw u here");
                                    const workingList = doc(db, "users");
                                    // await updateDoc(doc, {
                                    //     lists[i].books : arrayUnion(completed, currentPage, currentBookId, startedOn),
                                    //     books: arrayUnion("greater_virginia"),
                                    // });
                                    bookAlreadyExists = false;
                                }
                            });
                            console.log(list.books);
                            //list.books.push()
                        }
                    });
                    console.log(docSnap.docs[0].id);
                }

                //extract the lists and add the book to the selected list
                //add a date added and if added to readingList then add a date started field
                //console.log(doc.data());
            });

            console.log(checkedShelves);
        } catch (logoutError) {
            setError("Failed to log out");
        }
    }

    function capitalizeText(text) {
        text = text
            .toLowerCase()
            .split(" ")
            .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
            .join(" ");

        return text;
    }

    async function getBookFromGoogle(title, authorsName) {
        var authorFirst = authorsName.split(" ")[0];
        let url =
            "https://www.googleapis.com/books/v1/volumes?q=inauthor:" +
            authorFirst +
            "+intitle:" +
            title +
            "&key=AIzaSyBA-Q3JKT8Y8qJ2Aw7V4oSJTCDT-CiOsAM";
        const resp = await axios.get(url);

        if (resp.status == 200) {
            return resp.data;
        }
    }

    async function addBookToFireStore(volumeInfo) {
        volumeInfo["imageLink"] = volumeInfo.imageLinks.thumbnail;
        volumeInfo["author"] = volumeInfo.authors[0];
        volumeInfo["category"] = capitalizeText(volumeInfo.categories[0]);
        volumeInfo["publishYear"] = volumeInfo.publishedDate;

        delete volumeInfo["authors"];
        delete volumeInfo["allowAnonLogging"];
        delete volumeInfo["canonicalVolumeLink"];
        delete volumeInfo["categories"];
        delete volumeInfo["contentVersion"];
        delete volumeInfo["industryIdentifiers"];
        delete volumeInfo["infoLink"];
        delete volumeInfo["language"];
        delete volumeInfo["previewLink"];
        delete volumeInfo["printType"];
        delete volumeInfo["publisher"];
        delete volumeInfo["readingModes"];
        delete volumeInfo["ratingsCount"];
        delete volumeInfo["imageLinks"];
        delete volumeInfo["panelizationSummary"];
        delete volumeInfo["publishedDate"];
        delete volumeInfo["maturityRating"];

        const docRef = await addDoc(collection(db, "books"), {
            volumeInfo,
        });

        console.log(volumeInfo);
    }

    async function handleAddShelf() {
        setError("");

        try {
            console.log("helllllooooo");
        } catch (logoutError) {
            setError("Failed to log out");
        }
        console.log(error);
    }

    function handleButtonPress(e) {
        try {
            if (e.target.checked == true) {
                setCheckedShelves((prevArray) => [...prevArray, e.target.id]);
            } else {
                setCheckedShelves((prevArray) =>
                    prevArray.filter((shelf) => shelf != e.target.id)
                );
            }
        } catch (logoutError) {
            setError("Failed to log out");
        }
    }

    return (
        <div>
            <div class="row justify-content-center g-0 mt-5">
                <Button
                    style={{
                        backgroundColor: "#FFFFFA",
                        border: "0px",
                        width: "80px",
                        borderRadius: "17px",
                        padding: "5px",
                        boxShadow: "0px 0px 26px rgba(0,0,0,.25)",
                    }}
                    data-bs-toggle="modal"
                    data-bs-target="#addBookModal"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="43"
                        height="25"
                        fill="black"
                        class="bi bi-book"
                        viewBox="0 0 45 25"
                    >
                        <path
                            d="M18.75 4.12576C20.2987 3.45514 22.5195 2.73195 24.679 2.5072C27.0065 2.26433 28.9805 2.62139 30.125 3.8702V21.5348C28.4888 20.5742 26.415 20.4419 24.5023 20.6413C22.4373 20.8588 20.3547 21.4768 18.75 22.1112V4.12576ZM31.875 3.8702C33.0195 2.62139 34.9935 2.26433 37.321 2.5072C39.4805 2.73195 41.7013 3.45514 43.25 4.12576V22.1112C41.6435 21.4768 39.5627 20.857 37.4978 20.6431C35.5833 20.4419 33.5112 20.5724 31.875 21.5348V3.8702ZM31 2.2317C29.2762 0.696513 26.7773 0.468138 24.5023 0.703763C21.8528 0.981075 19.1788 1.92176 17.5128 2.70658C17.3599 2.77858 17.2303 2.89463 17.1393 3.04086C17.0484 3.18709 17 3.35733 17 3.53126V23.4688C17 23.6204 17.0368 23.7696 17.107 23.9027C17.1771 24.0358 17.2784 24.1485 17.4015 24.2306C17.5246 24.3126 17.6656 24.3614 17.8116 24.3724C17.9576 24.3834 18.104 24.3562 18.2373 24.2935C19.7808 23.5685 22.2675 22.6966 24.6772 22.4447C27.143 22.1873 29.2098 22.6024 30.3175 24.0343C30.3995 24.1401 30.5034 24.2255 30.6215 24.2842C30.7396 24.3429 30.869 24.3734 31 24.3734C31.131 24.3734 31.2604 24.3429 31.3785 24.2842C31.4966 24.2255 31.6005 24.1401 31.6825 24.0343C32.7903 22.6024 34.857 22.1873 37.321 22.4447C39.7325 22.6966 42.221 23.5685 43.7628 24.2935C43.896 24.3562 44.0424 24.3834 44.1884 24.3724C44.3344 24.3614 44.4754 24.3126 44.5985 24.2306C44.7216 24.1485 44.8229 24.0358 44.893 23.9027C44.9632 23.7696 45 23.6204 45 23.4688V3.53126C45 3.35733 44.9516 3.18709 44.8607 3.04086C44.7697 2.89463 44.6401 2.77858 44.4872 2.70658C42.8212 1.92176 40.1473 0.981075 37.4978 0.703763C35.2227 0.466325 32.7238 0.696513 31 2.2317Z"
                            fill="black"
                        />
                        <path
                            d="M10 11.7143H5.71429V16H4.28571V11.7143H0V10.2857H4.28571V6H5.71429V10.2857H10V11.7143Z"
                            fill="black"
                        />
                    </svg>
                </Button>
            </div>
            <div class="row justify-content-center g-0 mt-5 mb-5">
                <Button
                    style={{
                        backgroundColor: "#FFFFFA",
                        border: "0px",
                        width: "80px",
                        borderRadius: "17px",
                        padding: "5px",
                        boxShadow: "0px 0px 26px rgba(0,0,0,.25)",
                    }}
                    data-bs-toggle="modal"
                    data-bs-target="#addShelfModal"
                >
                    <svg
                        width="43"
                        height="24"
                        viewBox="0 0 45 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M17 22.6667C17 22.313 17.1341 21.9739 17.3728 21.7239C17.6115 21.4738 17.9352 21.3333 18.2727 21.3333H43.7273C44.0648 21.3333 44.3885 21.4738 44.6272 21.7239C44.8659 21.9739 45 22.313 45 22.6667C45 23.0203 44.8659 23.3594 44.6272 23.6095C44.3885 23.8595 44.0648 24 43.7273 24H18.2727C17.9352 24 17.6115 23.8595 17.3728 23.6095C17.1341 23.3594 17 23.0203 17 22.6667ZM17 12C17 11.6464 17.1341 11.3072 17.3728 11.0572C17.6115 10.8071 17.9352 10.6667 18.2727 10.6667H43.7273C44.0648 10.6667 44.3885 10.8071 44.6272 11.0572C44.8659 11.3072 45 11.6464 45 12C45 12.3536 44.8659 12.6928 44.6272 12.9428C44.3885 13.1929 44.0648 13.3333 43.7273 13.3333H18.2727C17.9352 13.3333 17.6115 13.1929 17.3728 12.9428C17.1341 12.6928 17 12.3536 17 12ZM17 1.33333C17 0.979711 17.1341 0.640573 17.3728 0.390525C17.6115 0.140476 17.9352 0 18.2727 0H43.7273C44.0648 0 44.3885 0.140476 44.6272 0.390525C44.8659 0.640573 45 0.979711 45 1.33333C45 1.68696 44.8659 2.02609 44.6272 2.27614C44.3885 2.52619 44.0648 2.66667 43.7273 2.66667H18.2727C17.9352 2.66667 17.6115 2.52619 17.3728 2.27614C17.1341 2.02609 17 1.68696 17 1.33333V1.33333Z"
                            fill="black"
                        />
                        <path
                            d="M10 12.7143H5.71429V17H4.28571V12.7143H0V11.2857H4.28571V7H5.71429V11.2857H10V12.7143Z"
                            fill="black"
                        />
                    </svg>
                </Button>
            </div>
            <div>
                <div
                    class="modal fade"
                    id="addBookModal"
                    tabindex="-1"
                    aria-labelledby="exampleModalLabel"
                    aria-hidden="true"
                >
                    <div class="modal-dialog modal-dialog-centered">
                        <div
                            class="modal-content"
                            style={{
                                border: "none",
                                borderRadius: "0px",
                                backgroundColor: "#F3E9D4",
                            }}
                        >
                            <div
                                class="modal-header"
                                style={{
                                    border: "none",
                                }}
                            >
                                <h5
                                    class="modal-title"
                                    id="exampleModalLabel"
                                    style={{
                                        fontWeight: "700",
                                        fontSize: "30px",
                                    }}
                                >
                                    Add Book
                                </h5>
                                <button
                                    type="button"
                                    class="btn-close"
                                    data-bs-dismiss="modal"
                                    aria-label="Close"
                                ></button>
                            </div>
                            <div class="modal-body">
                                <Container fluid>
                                    <div class="row justify-content-center g-0">
                                        <Col sm={6}>
                                            <Form onSubmit={handleLogout}>
                                                <Form.Group
                                                    id="title"
                                                    className="formGroup"
                                                >
                                                    <Form.Label className="formLabel">
                                                        Title
                                                    </Form.Label>
                                                    <Form.Control
                                                        style={{
                                                            backgroundColor:
                                                                "#fff",
                                                            border: "none",
                                                        }}
                                                        type="text"
                                                        ref={titleRef}
                                                        required
                                                    />
                                                </Form.Group>
                                                <Form.Group
                                                    id="author"
                                                    className="formGroup"
                                                >
                                                    <Form.Label className="formLabel">
                                                        Author's Name
                                                    </Form.Label>
                                                    <Form.Control
                                                        style={{
                                                            backgroundColor:
                                                                "#fff",
                                                            border: "none",
                                                        }}
                                                        type="text"
                                                        ref={authorsNameRef}
                                                        required
                                                    />
                                                </Form.Group>
                                            </Form>
                                        </Col>
                                        <Col
                                            sm={6}
                                            style={{
                                                paddingLeft: "30px",
                                            }}
                                        >
                                            <p>Where should this book go?</p>

                                            <Form>
                                                {shelfArray.map((item, i) => {
                                                    return (
                                                        <div
                                                            style={{
                                                                paddingBottom:
                                                                    "10px",
                                                            }}
                                                        >
                                                            <input
                                                                type="checkbox"
                                                                class="btn-check"
                                                                onClick={
                                                                    handleButtonPress
                                                                }
                                                                id={item}
                                                                autocomplete="off"
                                                            />
                                                            <label
                                                                class="btn btn-outline-dark"
                                                                for={item}
                                                            >
                                                                {item}
                                                            </label>
                                                        </div>
                                                    );
                                                })}
                                            </Form>
                                        </Col>
                                    </div>
                                </Container>
                            </div>
                            <div
                                class="modal-footer justify-content-center"
                                style={{ border: "none" }}
                            >
                                <button
                                    type="button"
                                    class="btn"
                                    onClick={handleAddBook}
                                    data-bs-dismiss="modal"
                                    style={{
                                        backgroundColor: "#dc8920",
                                        borderRadius: "25px",
                                        width: "90px",
                                    }}
                                >
                                    Done
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <div
                    class="modal fade"
                    id="addShelfModal"
                    tabindex="-1"
                    aria-labelledby="exampleModalLabel"
                    aria-hidden="true"
                >
                    <div class="modal-dialog modal-dialog-centered">
                        <div
                            class="modal-content"
                            style={{ border: "none", borderRadius: "0px" }}
                        >
                            <div
                                class="modal-header"
                                style={{ border: "none" }}
                            >
                                <h5 class="modal-title" id="exampleModalLabel">
                                    Add Shelf
                                </h5>
                                <button
                                    type="button"
                                    class="btn-close"
                                    data-bs-dismiss="modal"
                                    aria-label="Close"
                                ></button>
                            </div>
                            <div class="modal-body">...</div>
                            <div
                                class="modal-footer justify-content-center"
                                style={{ border: "none" }}
                            >
                                <button
                                    type="button"
                                    class="btn"
                                    data-bs-dismiss="modal"
                                    onClick={handleAddShelf}
                                    style={{ backgroundColor: "#e7a148" }}
                                >
                                    Done
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
