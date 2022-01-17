import React, {useEffect, useState} from 'react';
import Routes from "./components/Routes";
import {UidContext} from "./components/AppContext";
import axios from "axios";

function App() {
    const [uid, setUid] = useState(null);

    useEffect(async () => {
        await axios({
                method: "get",
                url: `${process.env.REACT_APP_API_URL}jwtid`,
                withCredentials: true,
            })
            .then((res) => setUid(res.data))
            .catch((err) => console.log("No Token"));
    }, [uid]);

  return (
    <UidContext.Provider value={uid}>
      <Routes />
    </UidContext.Provider>
  );
}

export default App;
