import * as React from "react";
import * as ReactDOM from "react-dom";
import {BrowserRouter, Route, Switch} from 'react-router-dom';

import {Home} from './pages/home/Home';
import Board from './pages/board/Board';
import { defaultContext, TrelloContext } from './context';
import "./index.scss";

ReactDOM.render(
    <TrelloContext.Provider value={defaultContext}>
        <BrowserRouter>
            <Switch>
                <Route exact path='/'>
                    <Home />
                </Route>
                <Route path='/board'>
                    <Board />
                </Route>
            </Switch>
        </BrowserRouter>
    </TrelloContext.Provider>,
    document.getElementById("root")
);