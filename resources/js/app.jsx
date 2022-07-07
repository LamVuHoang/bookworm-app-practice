import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Welcome from "./welcome";

ReactDOM.render(
    <BrowserRouter>
        <Welcome />
    </BrowserRouter>,
    document.getElementById("root")
);
