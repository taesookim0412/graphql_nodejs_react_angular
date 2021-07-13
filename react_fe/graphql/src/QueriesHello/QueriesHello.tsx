import axios from "axios";
import {useState} from "react";

export function QueriesHello(){
    const [getData, setData] = useState("")
    axios.post("/graphql", {query: "{ hello }"}).then(res => {
        setData(res.data.data.hello)
    })
    // axios.get("/test").then(res => console.log(res.data))

    return (<div>
        {getData}
    </div>)
}
