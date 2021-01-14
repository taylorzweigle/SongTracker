//Taylor Zweigle, 2021
import React from "react";
import { Route, Redirect, Switch } from "react-router-dom";

import SongPage from "./pages/songPage";
import NewSongPage from "./pages/newSongPage";
import EditSongPage from "./pages/editSongPage";

function App() {
    return (
        <main>
            <Switch>
                <Route path="/song/:id" component={EditSongPage} />
                <Route path="/songs" exact component={SongPage} />
                <Route path="/song" exact component={NewSongPage} />
                <Redirect from="/" exact to="/songs" />
            </Switch>
        </main>
    );
};

export default App;