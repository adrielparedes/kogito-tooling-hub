// import '@patternfly/patternfly/patternfly.css';
import React, { Fragment } from 'react';
import { render } from 'react-dom';
import { AppContainer as ReactHotAppContainer } from 'react-hot-loader';
import { Provider } from 'unstated';
import './app.global.scss';
import Root from './containers/Root';
import { configureStore, history } from './store/configureStore';

const store = configureStore();

const AppContainer = process.env.PLAIN_HMR ? Fragment : ReactHotAppContainer;

document.addEventListener('DOMContentLoaded', () =>
  render(
    <Provider>
      <AppContainer>
        <Root store={store} history={history} />
      </AppContainer>
    </Provider>,
    document.getElementById('root')
  )
);
