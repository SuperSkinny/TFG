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
import Countdown from './components/countdown';


function App() {
  

  return (
    <MemoryRouter>
        <Router >
            <Navbar/>
            <div className="content">
                <Switch>
                    <Route path={"/tutorial"}>
                        <Tutorial />
                    </Route>
                    <Route path={"/ranking"}>
                        <Ranking />
                    </Route>
                    <Route path={"/contact"}>
                     <Contact />
                    </Route>
                    <Route path={"/login"} >
                        <LoginForm />
                    </Route>
                    <Route path={"/registration"} >
                        <Registration />
                    </Route>
                    <Route path={"/profile"} >
                        <Profile />
                    </Route>
                    <Route path={"/preGame"}>
                        <PreGame />
                    </Route>
                    <Route path={"/game"}>
                        <Game />
                    </Route>
                    <Route path={"/postGame"}>
                        <PostGame />
                    </Route>
                    <Route path={"/"} >
                    <div className="content">
                        <Home />
                    </div>
                    </Route>
                </Switch>
            </div>
            <Footer/>
        </Router>
    </MemoryRouter>

  );
}

export default App;
