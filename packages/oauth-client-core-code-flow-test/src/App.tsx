import { useEffect, useState } from "react";
import { OidcProvider, useOidc } from "./oidc/OidcProvider";
import { BrowserRouter, Link, Route, Switch } from "react-router-dom";
import { ProtectedRoute } from "./oidc/ProtectedRoute";
import { useUrlRestoration } from "./oidc/useUrlRestoration";
import { getProfile } from "./api/profile";
import { globals } from "./globals";
import { OAuthClientConfig } from "@ilionx/oauth-client-core";

const Profile = () => {
  const [profile, setProfile] = useState(null);
  useEffect(() => {
    getProfile().then(({ data }) => {
      setProfile(data);
    });
  }, []);

  return <pre>{JSON.stringify(profile, null, 2)}</pre>;
};

const Nested = () => {
  useUrlRestoration();
  const [state, setState] = useState(1);
  const { isAuthenticated } = useOidc();
  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/profile">Profile</Link>
          </li>
          <li>
            <Link to="/users">Users</Link>
          </li>
        </ul>
      </nav>

      <Switch>
        <ProtectedRoute path="/profile">
          <Profile></Profile>
        </ProtectedRoute>
        <ProtectedRoute path="/users">users</ProtectedRoute>
        <Route path="/">home</Route>
      </Switch>

      <div>state: {state}</div>
      <button
        onClick={() => {
          setState((s) => s + 1);
        }}
      >
        change state
      </button>
    </>
  );
};

function App() {
  const [oidcConfig] = useState<OAuthClientConfig>({
    debug: true,
    issuer: "https://ilionx-test.eu.auth0.com",
    client_id: `W5lTNsN13tdjDILofiKcq8MQNbuE1DpX`,
    response_type: "code",
    scope: "openid",
    redirect_uri: `${window.location.origin}/app`,
  });

  return (
    <div>
      <OidcProvider oidcConfig={oidcConfig} autoLogout={15000}>
        <BrowserRouter basename="app">
          <Nested />
        </BrowserRouter>
      </OidcProvider>
    </div>
  );
}

export default App;
