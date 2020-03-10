import React from 'react';
import { Route, Switch } from 'react-router';
import routes from './constants/routes.json';
import App from './containers/App';
import SplashPage from './containers/SplashPage';
import WizardPage from './containers/WizardPage';

export default function Routes() {
  return (
    <App>
      <Switch>
        <Route path={routes.WIZARD_CHROME} component={WizardPage} />
        <Route path={routes.WIZARD_VSCODE} component={WizardPage} />
        <Route path={routes.SPLASH} component={SplashPage} />
      </Switch>
    </App>
  );
}
