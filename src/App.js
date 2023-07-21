import React, { useEffect, useState } from "react";
import Nav from "react-bootstrap/Nav";

import { DataContext } from "./crossfilter/DataContext";
import Header from "./pages/Header";
import Main from "./pages/Main";
import OpenWith from "./pages/OpenWith";

import Cookies from "js-cookie";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import "react-input-range/lib/css/index.css";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const url1 = window.OMEROWEB_INDEX + `api/v0/token`;

    const login = async function () {
      const res1 = await fetch(url1);
      const token = (await res1.json()).data;
      console.log(token);

      const url2 = window.OMEROWEB_INDEX + `api/v0/login/`;

      const loginCredentials = { username: "dsp", password: "dspuser1!", server: 1 };

      const formData = new FormData();

      for (const name in loginCredentials) {
        formData.append(name, loginCredentials[name]);
      }

      const res2 = await fetch(url2, {
        method: "post",
        headers: {
          // "Content-Type": "application/json",
          // "X-CSRFToken": token,
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formData,
        credentials: "include",
      });
      const loginData = await res2.json();
      console.log(loginData);
      Cookies.set("sessionid", "xxx", { domain: "rndomero01.uhbs.ch" });
      setIsLoggedIn(true);
    };

    login();
  }, [isLoggedIn]);

  return (
    <div className="App">
      <DataContext>
        <Nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
          <Header />
          <OpenWith isLoggedIn={isLoggedIn} />
        </Nav>
        <Main isLoggedIn={isLoggedIn} />
      </DataContext>
    </div>
  );
}

export default App;
