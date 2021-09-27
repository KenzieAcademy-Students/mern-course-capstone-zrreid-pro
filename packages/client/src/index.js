import React from 'react';
import ReactDOM from 'react-dom';
import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter } from 'react-router-dom';
import { ProvideAuth } from 'hooks/useAuth';
import { ProvideProject } from 'hooks/useProject';
import App from 'App';
// import HomePage from 'pages/HomePage';
import './index.scss';

ReactDOM.render(
  <ChakraProvider>
    <ProvideAuth>
      <BrowserRouter>
        <ProvideProject>
          <App />
        </ProvideProject>
      </BrowserRouter>
    </ProvideAuth>
  </ChakraProvider>,
  document.getElementById('root')
);