import React from "react";
import { MDBContainer, MDBRow, MDBCol } from "mdb-react-ui-kit";
import { useHistory } from "react-router-dom";
import "./Dashboard.css";
const axios = require("axios");

function Dashboard() {
    return (
        <MDBContainer>
            <MDBRow>
                <MDBCol size="md" className="col-example">
                    One of three columns
                </MDBCol>
                <MDBCol size="md" className="col-example">
                    One of three columns
                </MDBCol>
                <MDBCol size="md" className="col-example">
                    One of three columns
                </MDBCol>
            </MDBRow>
        </MDBContainer>
    );
}

export default Dashboard;
