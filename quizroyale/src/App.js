import React, {useState} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import { MemoryRouter } from 'react-router'

import LoginForm from './components/login';
import Registration from './components/registration'
import Profile from './components/profile'
import Contact from './screens/contact';
import Home from './screens/home';
import Navbar from './navigation/navbar';
import Tutorial from './screens/tutorial';
import Ranking from './screens/ranking';
import Footer from './components/footer';
import PreGame from './screens/preGame';
import Game from './screens/game';
import PostGame from './screens/postGame';


function App() {
    
    return (
        <MemoryRouter>
            <Router >
                <div className="content">
                    <Switch>
                        <Route exact path={"/tutorial"}>
                            <Navbar />
                            <Tutorial/>
                        </Route>
                        <Route exact path={"/ranking"}>
                            <Navbar />  
                            <Ranking />
                        </Route>
                        <Route exact path={"/contact"}>
                            <Navbar />
                            <Contact />
                        </Route>
                        {/* <Route exact path={"/login"} >
                            <LoginForm />
                        </Route> */}
                        {/* <Route exact path={"/registration"} >
                            <Registration />
                        </Route> */}
                        <Route exact path={"/profile"} >
                            <Navbar />
                            <Profile />
                        </Route>
                        <Route exact path={"/preGame"}>
                            <PreGame />
                        </Route>
                        {/* <Route exact path={"/game"}>
                            <Game />
                        </Route> */}
                        {/* <Route exact path={"/postGame"}>
                            <PostGame />
                        </Route> */}
                        <Route path={"/"} >
                            <Navbar />
                            <Home />
                        </Route>
                    </Switch>
                </div>
                <Footer/>
            </Router>
        </MemoryRouter>

    );
}

export default App;
