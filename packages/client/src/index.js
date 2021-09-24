import React from 'react';
import ReactDOM from 'react-dom';
import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { LoginPage, Dashboard } from 'pages';
import { ProvideAuth } from 'hooks/useAuth';
import HomePage from 'pages/HomePage';
import './index.scss';

ReactDOM.render(
  <ChakraProvider>
    <ProvideAuth>
      <BrowserRouter>  
        <Switch>
          <Route exact path='/' component={LoginPage} />
          <Route exact path='/dashboard' component={Dashboard} />
          { /* Add more routes here */}
        </Switch>
      </BrowserRouter>
    </ProvideAuth>
  </ChakraProvider>,
  document.getElementById('root')
)
