import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ToggleMenuProvider } from './contexts/ToggleMenuContext';
import BlogRoutes from './routes/routes';
import { AuthProvider } from './contexts/UserContext/loginContext';

const App: React.FunctionComponent = () => (
  <Router>
    <AuthProvider>
      <ToggleMenuProvider>
        <BlogRoutes />
      </ToggleMenuProvider>
    </AuthProvider>
  </Router>
);

export default App;
