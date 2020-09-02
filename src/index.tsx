import * as React from "react";
import * as ReactDOM from "react-dom";

import {Home} from './pages/home/Home';
import "./index.scss";

import {TrelloContext} from './context';
import * as data from '../static/data.json';

ReactDOM.render(
    <TrelloContext.Provider value={data}>
        <Home />
    </TrelloContext.Provider>,
    document.getElementById("root")
);