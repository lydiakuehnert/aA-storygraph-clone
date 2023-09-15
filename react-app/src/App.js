import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import HomePage from "./components/HomePage";
import AllBooks from "./components/AllBooks";
import OneBook from "./components/OneBook";
import UserBooks from "./components/UserBooks";
import AddBook from "./components/AddBook";
import BookSearch from "./components/BookSearch";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
        <Navigation isLoaded={isLoaded} />
        {isLoaded && (
          <Switch>
            <Route exact path="/">
              <HomePage />
            </Route>
            <Route path="/login" >
              <LoginFormPage />
            </Route>
            <Route path="/signup">
              <SignupFormPage />
            </Route>
            <Route exact path="/books">
              <AllBooks />
            </Route>
            <Route path="/books/search">
              <BookSearch />
            </Route>
            <Route exact path='/books/user'>
              <UserBooks />
            </Route>
            <Route exact path='/books/new'>
              <AddBook />
            </Route>
            <Route exact path="/books/:bookId">
              <OneBook />
            </Route>
          </Switch>
        )}
        <Footer isLoaded={isLoaded} />
    </>
  );
}

export default App;
