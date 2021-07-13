import axios from "axios";
import {useState} from "react";

export function QueriesAccount(){
    const [getData, setData] = useState("")

    const query = `query AttemptLogin($username:String!, $password:String!){
    login(username: $username, password: $password)
    }`;
    const username = 'username123'
    const password = 'password123'

    // axios.post("/graphql", {query: query, variables: {username: "username123", password: "password123" }}).then(res => {
    axios.post("/graphql", {query, variables: {username, password}}).then(res => {
        setData(res.data.data.login)
    })

    return (<div>
        {getData}
    </div>)
}
