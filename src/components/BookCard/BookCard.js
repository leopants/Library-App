import React, { useState, useRef, useEffect } from "react";
import "../NavBar/NavBar";
import { Card, Button, Container, Col, Form } from "react-bootstrap";
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
require("firebase/compat/firestore");


export default function BookCard(props) {
    const db = firebase.firestore();

    const { currentUser } = useAuth();

    const title = props.title;
    const author = props.author;
    const totalPages = props.pageCount;
    const imageLink = props.imageLink;
    const comment = props.comment;
    const rating = props.rating;
    const currentPage = props.currentPage;
    const completed = props.completed

    const updatePageRef = useRef();
    const completedRef = useRef();
    const commentRef = useRef();
    const ratingRef = useRef();

    if(completed == true) {
        commentRef = true
    }

    const updateCurrentBook = async() => {
        const listQuery = await query(
            collection(db, "userlists"),
            where("useremail", "==", currentUser.email)
        );
        const listSnapshot = await getDocs(listQuery);

        console.log(listSnapshot)

        var switchCheck = document.getElementById("flexSwitchCheckDefault")
        console.log(switchCheck.checked)
        console.log(commentRef.current.value)
        console.log(title)


    }

    return (
        <div class="col">
            <div class="row justify-content-start g-0 mt-0 ms-0 me-0 mb-0">
                <Card
                    style={{
                        width: "350px",
                        flexDirection: "row",
                        border: "none",
                        backgroundColor: "#F3E9D4",
                    }}
                >
                    <Card.Img
                        src={imageLink}
                        fluid
                        style={{
                            width: "130px",
                            height: "210px",
                            borderRadius: "16px",
                            objectFit: "cover",
                        }}
                    />
                    <Card.Body
                        style={{
                            padding: "0px",
                            paddingLeft: "20px",
                            alignSelf: "center",
                        }}
                    >
                        <Card.Text
                            class="mt-5"
                            style={{
                                fontSize: "20px",
                                fontFamily: "Work Sans",
                                fontWeight: 600,
                                margin: "0px",
                                height: "100px",
                            }}
                        >
                            {title}
                        </Card.Text>
                        <Card.Text
                            class="mt-1"
                            style={{
                                fontSize: "14px",
                                fontFamily: "Work Sans",
                                fontWeight: 300,
                                margin: "0px",
                            }}
                        >
                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "flex-start",
                                }}
                            >
                                <p
                                    style={{
                                        fontSize: "17px",
                                        fontFamily: "Work Sans",
                                        fontWeight: 300,
                                        margin: "0px",
                                        alignSelf: "flex-end",
                                    }}
                                >
                                    by&nbsp;{" "}
                                </p>
                                <p
                                    style={{
                                        fontSize: "18px",
                                        fontFamily: "Work Sans",
                                        fontWeight: 500,
                                        margin: "0px",
                                        alignSelf: "center",
                                        paddingTop: "3px",
                                    }}
                                >
                                    {author}
                                </p>
                            </div>
                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "flex-start",
                                }}
                            >
                                <p
                                    style={{
                                        fontSize: "18px",
                                        fontFamily: "Work Sans",
                                        fontWeight: 500,
                                        margin: "0px",
                                        alignSelf: "center",
                                        paddingTop: "3px",
                                    }}
                                >
                                    Page {currentPage}/{totalPages}
                                </p>
                            </div>
                        </Card.Text>
                        <a href="#" data-bs-toggle="modal" data-bs-target="#updateBookModal" class="stretched-link"></a>
                    </Card.Body>
                </Card>
            </div>
            <div
                    class="modal fade"
                    id="updateBookModal"
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
                                    Update Book
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
                                            <Form onSubmit={updateCurrentBook}>
                                                <Form.Group
                                                    id="title"
                                                    className="formGroup"
                                                >
                                                    <Form.Label className="formLabel">
                                                        Update Page Count
                                                    </Form.Label>
                                                    <Form.Control
                                                        style={{
                                                            backgroundColor:
                                                                "#fff",
                                                            border: "none",
                                                        }}
                                                        type="text"
                                                        ref={updatePageRef}
                                                        required
                                                    />
                                                </Form.Group>
                                                <Form.Group
                                                    id="author"
                                                    className="formGroup"
                                                >
                                                    <Form.Label className="formLabel">
                                                        Completed
                                                    </Form.Label>
                                                    <div class="form-check form-switch">
                                                        <input class="form-check-input" type="checkbox" id="flexSwitchCheckDefault" ref={completedRef}/>
                                                    </div>
                                                </Form.Group>
                                                <Form.Group
                                                    id="title"
                                                    className="formGroup"
                                                >
                                                    <Form.Label className="formLabel">
                                                        Rating
                                                    </Form.Label>
                                                    <Form.Control
                                                        style={{
                                                            backgroundColor:
                                                                "#fff",
                                                            border: "none",
                                                        }}
                                                        type="number"
                                                        min={0}
                                                        max={5}
                                                        ref = {ratingRef}
                                                        defaultValue={rating}
                                                        required
                                                    />
                                                </Form.Group>
                                                <Form.Group
                                                    id="title"
                                                    className="formGroup"
                                                >
                                                    <Form.Label className="formLabel">
                                                        Comment
                                                    </Form.Label>
                                                    <Form.Control
                                                        style={{
                                                            backgroundColor:
                                                                "#fff",
                                                            border: "none",
                                                        }}
                                                        as="textarea"
                                                        ref = {commentRef}
                                                        defaultValue={comment}
                                                        required
                                                    />
                                                </Form.Group>
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
                                    onClick={updateCurrentBook}
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
    );
}
