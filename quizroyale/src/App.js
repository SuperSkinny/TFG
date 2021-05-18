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
    // console.log("el site d elos huevos"+site)
    // const withNavBar = () => {
        
    //     if ( site !== "/tutorial" || site === "/home" ) {
    //         return (
    //             <Navbar />
    //         )
    //     }else{
    //         return null;
    //     }
    // }
    return (
        <MemoryRouter>
            <Router >
                {/* {withNavBar()} */}
                
                <div className="content">
                    <Switch>
                        <Route path={"/tutorial"}>
                            <Navbar />
                            <Tutorial
                                site={"/tutorial"}
                            />
                        </Route>
                        <Route path={"/ranking"}>
                            <Navbar />  
                            <Ranking />
                        </Route>
                        <Route path={"/contact"}>
                            <Navbar />
                            <Contact />
                        </Route>
                        <Route path={"/login"} >
                            <LoginForm />
                        </Route>
                        <Route path={"/registration"} >
                            <Registration />
                        </Route>
                        <Route path={"/profile"} >
                            <Navbar />
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
                        <Route site={"/tutorial"} path={"/"} >
                        {/* <div className="content"> */}
                            <Navbar />
                            <Home />
                        {/* </div> */}
                        </Route>
                    </Switch>
                </div>
                <Footer/>
            </Router>
        </MemoryRouter>

    );
}

export default App;
