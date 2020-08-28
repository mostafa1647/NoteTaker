import React from 'react';
import {ReactQueryDevtools} from 'react-query-devtools';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Home from "./components/Home/Home";
import Navbar from "./components/Navbar/Navbar";
import About from "./components/About/About";
import Notes from "./components/Notes/Notes";
import AddNote from "./components/AddNote/AddNote";

function App() {
    return (
        <>
            <Router>
                <Navbar />
                <Switch>
                    <Route exact path={'/'}>
                        <Home />
                    </Route>
                    <Route exact path={'/notes'}>
                        <Notes />
                    </Route>
                    <Route exact path={'/notes/add'}>
                        <AddNote />
                    </Route>
                    <Route exact path={'/about'}>
                        <About />
                    </Route>
                    <Route path={'/*'}>
                        <Home />
                    </Route>
                </Switch>
            </Router>
            <ReactQueryDevtools initialIsOpen={false} />
        </>
    );
}

export default App;
