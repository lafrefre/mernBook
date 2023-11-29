import React from 'react';
import { ApolloProvider } from '@apollo/client';
import ApolloClient from 'apollo-boost';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import SearchBooks from './pages/SearchBooks';
import SavedBooks from './pages/SavedBooks';
import './App.css';
import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';

const client = new ApolloClient({
  uri: '/graphql',
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <Switch>
          <Route exact path="/" Component={SearchBooks} />
          <Route exact path="/saved" Component={SavedBooks} />
        </Switch>
      </Router>
    </ApolloProvider>
  );
}

export default App;