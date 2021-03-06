import React from 'react';
import ReactDOM from 'react-dom';
import { AppRouter } from 'AppRouter';
import { BrowserRouter } from 'react-router-dom';
import { ProvideAuth } from 'hooks/useAuth';
import { ProvideProject } from 'hooks/useProject';
import App from 'App';
import './index.scss';

ReactDOM.render(
  <ProvideAuth>
    <BrowserRouter>
      <AppRouter>
        <ProvideProject>
          <App />
        </ProvideProject>
      </AppRouter>
    </BrowserRouter>
  </ProvideAuth>,
  document.getElementById('root')
);