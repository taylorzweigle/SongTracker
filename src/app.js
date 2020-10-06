import React from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import SongPage from "./pages/songPage";
import FormPage from "./pages/formPage";

function App() {
    return (
        <main>
            <Switch>
                <Route path="/songs/:id" component={FormPage} />
                <Route path="/songs" component={SongPage} />
                <Route path="/newSong" component={FormPage} />
                <Redirect from="/" exact to="/songs" />
            </Switch>
        </main>
    );
};

export default App;