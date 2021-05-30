import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Profile from './components/profile'
import Contact from './screens/contact';
import Home from './screens/home';
import Navbar from './navigation/navbar';
import Tutorial from './screens/tutorial';
import Ranking from './screens/ranking';
import Footer from './components/footer';
import PreGame from './screens/preGame';
import Landing from './screens/landing';
import 'firebase/auth'
import { useFirebaseApp, useUser } from 'reactfire'
import PostGame from './screens/postGame';


function App() {

    const user = useUser()

    return (
        <>

        <Router >
            {/* {withNavBar()} */}
            
            <div className="content">
                <Switch>
                    <Route exact path={"/tutorial"}>
                        {!user.data ? (
                                <Landing/>
                            ) : (
                                <>
                                    <Navbar />
                                    <Tutorial />
                                </>
                            )
                        }
                    </Route>
                    <Route exact path={"/ranking"}>
                        {!user.data ? (
                                <Landing/>
                            ) : (
                                <>
                                    <Navbar />
                                    <Ranking 
                                        user={user.data}
                                    />
                                </>
                            )
                        }
                    </Route>
                    <Route exact path={"/contact"}>
                        {!user.data ? (
                                <Landing/>
                            ) : (
                                <>
                                    <Navbar />
                                    <Contact />
                                </>
                            )
                        }
                    </Route>
                    <Route exact path={"/profile"} >
                        {!user.data ? (
                                <Landing/>
                            ) : (
                                <>
                                    <Navbar />
                                    <Profile />
                                </>
                            )
                        }
                    </Route>
                    <Route exact path={"/preGame"}>
                        {!user.data ? (
                                <Landing/>
                            ) : (
                                <>
                                    <PreGame 
                                        user={user.data}
                                    />
                                </>
                            )
                        }
                    </Route>
                    <Route exact path={"/postGame"}>
                        {!user.data ? (
                                <Landing/>
                            ) : (
                                <>
                                    <PostGame 
                                        gameModeName={'Novato'}
                                        points={3}
                                        // uid={this.props.uid}
                                        // onGameGoBack={onGameGoBack}
                                        uid={user.data.uid}
                                    />
                                </>
                            )
                        }
                    </Route>
                    {/* <Route path={"/game"}>
                        <Game />
                    </Route>
                    <Route path={"/postGame"}>
                        <PostGame />
                    </Route> */}
                    <Route path={"/"} >
                        {!user.data ? (
                                <Landing/>
                            ) : (
                                <>
                                    <Navbar />
                                    <Home />
                                </>
                            )
                        }
                    </Route>
                </Switch>
            </div>
            <Footer/>
        </Router>
        
        
        
           
            
        </>
    );
}

export default App;
