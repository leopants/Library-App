import React from "react";
import "../NavBar/NavBar";
import { Card } from "react-bootstrap";

export default function BookCard(props) {
    const title = props.title;
    const author = props.author;
    const totalPages = props.pageCount;
    const imageLink = props.imageLink;
    const currentPage = 28;

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
                    </Card.Body>
                </Card>
            </div>
        </div>
    );
}
