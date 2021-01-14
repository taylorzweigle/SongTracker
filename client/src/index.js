//Taylor Zweigle, 2021
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";

import App from "./app";

import "./index.css";
import "bootstrap/dist/css/bootstrap.css";
import "font-awesome/css/font-awesome.css";

ReactDOM.render(<BrowserRouter><App /></BrowserRouter>, document.getElementById("root"));