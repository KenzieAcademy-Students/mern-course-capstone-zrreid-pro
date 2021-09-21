import React from 'react';
import ReactDOM from 'react-dom';
import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { LoginPage, ProjectDashboard, UserDashboard } from 'pages';
import { ProvideAuth } from 'hooks/useAuth';
import HomePage from 'pages/HomePage';
import './index.css';

ReactDOM.render(
  <ChakraProvider>
    <ProvideAuth>
      <BrowserRouter>  
        <Switch>
          {/* <Route exact path='/' component={HomePage} /> */}
          <Route exact path='/' component={LoginPage} />
          <Route exact path='/projectdash' component={ProjectDashboard} />
          <Route exact path='/userdash' component={UserDashboard} />
          { /* Add more routes here */} 
        </Switch>
      </BrowserRouter>
    </ProvideAuth>,
  </ChakraProvider>,

  document.getElementById('root')
)
