// import logo from './logo.svg';
import "./App.css";
import LandingPage from "./components/LandingPage";
import Calculate from "./components/Calculate";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Auth0Provider } from "@auth0/auth0-react";

function App() {

  return (
    <Auth0Provider
      clientId= {process.env.REACT_APP_CLIENT_ID}
      domain={process.env.REACT_APP_DOMAIN}
      authorizationParams={{
        redirect_uri: window.location.origin
      }}
    > 
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/Calculate" element={<Calculate />} />
        </Routes>
      </BrowserRouter>
    </Auth0Provider>
  );
}

export default App;
