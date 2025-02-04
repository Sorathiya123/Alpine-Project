
import React, { useState, useEffect } from "react";


const API_Call = () => {
    const [loader, setLoader] = useState(false);
  

    const fetchData  = async (url, method="GET", body = null) => {
        setLoader(true)

        const requestOptions = {
            method: method,
            headers: {
                'Content-Type': 'application/json',
                // 'Authorization': `Bearer ${token}`,
            },
            body: body ? JSON.stringify(body) : null,
        };
        const response = await fetch(`https://arc.shellcode.co.in/api/user/${url}`, requestOptions);
        const data = await response.json();

      

        setLoader(false)
        return data.data;
    }
    return { fetchData , loader }
}
export default API_Call;

