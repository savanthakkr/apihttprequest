// Router.js
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import AddBook from './components/AddBook';
import AllBook from './components/AllBook';

const AppRouter = () => {
  return (
    <Router>
      <Switch>
        <Route path="/addBook" component={AddBook} />
        <Route path="/allBooks" component={AllBook} />
      </Switch>
    </Router>
  );
};

export default AppRouter;
