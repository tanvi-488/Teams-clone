import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import CallPage from "./Components/CallPage/CallPage";
import StartPage from "./Components/StartPage/StartPage";
import HomePage from "./Components/HomePage/HomePage";
import NoMatch from "./Components/NoMatch/NoMatch";
import ChatPage from "./Components/ChatPage/ChatPage";
import "./App.scss";
import React from "react";
import { AuthProvider } from "./Contexts/AuthContext";
import Login from "./Components/Login/Login";
import PrivateRoute from "./Components/PrivateRoute";
import ForgotPassword from "./Components/ForgotPassword/ForgotPassword";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/forgot-password" component={ForgotPassword} />
          <PrivateRoute exact path="/home" component={HomePage}></PrivateRoute>
          <PrivateRoute exact path="/chats" component={ChatPage}></PrivateRoute>
          <PrivateRoute exact path="/:id" component={CallPage}></PrivateRoute>
          <Route exact path="/">
            <StartPage />
          </Route>
          <Route exact path="*">
            <NoMatch />
          </Route>
        </Switch>
      </AuthProvider>
    </Router>
  );
}

export default App;
