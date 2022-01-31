import React, { useState, useEffect } from "react";
import "./StatsDashboard.css";
import { Button } from "react-bootstrap";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from "recharts";
import { useAuth } from "../../contexts/AuthContext";
import firebase from "firebase/compat/app";
import WikiJS from "wikijs";
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

export default function StatsDashboard(props) {
    const db = firebase.firestore();

    const currentList = props.currentList;
    const [error, setError] = useState("");
    const { currentUser, logout } = useAuth();


    const data = [
        {
            name: "Page A",
            uv: 4000,
            pv: 2400,
            amt: 2400,
        },
        {
            name: "Page B",
            uv: 3000,
            pv: 1398,
            amt: 2210,
        },
        {
            name: "Page C",
            uv: 2000,
            pv: 9800,
            amt: 2290,
        },
        {
            name: "Page D",
            uv: 2780,
            pv: 3908,
            amt: 2000,
        },
        {
            name: "Page E",
            uv: 1890,
            pv: 4800,
            amt: 2181,
        },
        {
            name: "Page F",
            uv: 2390,
            pv: 3800,
            amt: 2500,
        },
        {
            name: "Page G",
            uv: 3490,
            pv: 4300,
            amt: 2100,
        },
    ];

    const handleButtonPress = async () => {
        const authorsName = "Stephen King";
        const url =
            "https://www.wikidata.org/w/api.php?action=wbgetentities&format=json&titles=" +
            authorsName +
            "&sites=enwiki&origin=*";
        const res = await fetch(url);
        const data = await res.json();

        const entityId = Object.keys(data.entities)[0];

        const entityUrl = "https://www.wikidata.org/w/api.php?action=wbgetclaims&format=json&entity=" +
        entityId + "&property=P19" +
        "&sites=enwiki&origin=*";
        const entityRes = await fetch(entityUrl)
        const entityData = await entityRes.json()
        console.log(entityData)
        //gotta get the id from this to use on the thing.
        //P19 = birthplace, P569 = date of birth, P21 = sex or gender, P27 = country of citizenship
        //gotta get that persons entity, seperate into two functions then. One that gets the entity name and one that gets these claims
    };

    return (
        <div class="container-fluid g-0" style={{ padding: "0px" }}>
            <div class="row justify-content-center g-0">
                <div class="col-sm-12">{currentList.listname}</div>
                <Button onClick={handleButtonPress}>Testing for author information retrieval</Button>
                <LineChart
                    width={500}
                    height={300}
                    data={data}
                    margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line
                        type="monotone"
                        dataKey="pv"
                        stroke="#8884d8"
                        activeDot={{ r: 8 }}
                    />
                    <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
                </LineChart>
            </div>
        </div>
    );
}
