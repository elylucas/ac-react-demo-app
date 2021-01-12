import React from 'react';
import { Redirect, Route, Switch, useLocation } from 'react-router-dom';
import { IonApp, isPlatform } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import {
  AuthConnectProvider,
  PrivateRoute,
} from '@ionic-enterprise/auth-react';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import Login from './pages/Login';
import Tabs from './pages/Tabs';
import Logout from './pages/Logout';
import Callback from './pages/Callback';

const platform = isPlatform('capacitor') ? 'capacitor' : 'web';
const redirectUri = isPlatform('capacitor')
  ? 'com.elylucas.auth-demo://callback'
  : 'http://localhost:3000/callback';
const logoutUrl = isPlatform('capacitor')
  ? 'com.elylucas.auth-demo://logout'
  : 'http://localhost:3000/logout';

const App: React.FC = () => {
  return (
    <IonApp>
      <IonReactRouter>
        <AuthConnectContainer />
      </IonReactRouter>
    </IonApp>
  );
};

const AuthConnectContainer: React.FC = () => {
  const location = useLocation();
  return (
    <AuthConnectProvider
      refreshOnChange={location.pathname}
      logLevel={'ERROR'}
      authConfig={'auth0'}
      platform={platform}
      clientID={'kGsgYO5cTqBlRlkBZ77TooLqJxbSOThG'}
      discoveryUrl={
        'https://ionic-blog.auth0.com/.well-known/openid-configuration'
      }
      redirectUri={redirectUri}
      scope={'openid offline_access email picture profile'}
      audience={'https://api.myapp.com'}
      logoutUrl={logoutUrl}
      iosWebView={'private'}
      webAuthFlow={'PKCE'}
      implicitLogin={'POPUP'}
    >
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/logout" component={Logout} />
        <PrivateRoute path="/tabs">
          <Tabs />
        </PrivateRoute>
        <Route path="/callback" component={Callback} />
        <Redirect from="/" to="/login" />
      </Switch>
    </AuthConnectProvider>
  );
};

export default App;
