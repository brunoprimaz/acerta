import React from 'react';

import HomePage from './pages/Home';
import LeadFormPage from './pages/LeadForm';
import Container from 'react-bootstrap/Container';
import './App.scss';

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

const App: React.FC = () => {
  console.log('App')
  return (
      <Router>
        <Container className="p-3">
          <Switch>
            <Route exact path="/">
              <HomePage />
            </Route>
            <Route exact path="/lead">
              <LeadFormPage />
            </Route>
            <Route path="/lead/:id">
              <LeadFormPage />
            </Route>
          </Switch>
        </Container>
      </Router>
  );
};

export default App;
