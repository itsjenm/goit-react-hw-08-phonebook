import { Routes, Route } from 'react-router-dom';
import Header from './Header/Header';
import Signup from 'pages/Signup/Signup.jsx';
import Login from 'pages/Login/Login';
import Phonebook from '../pages/Phonebook/Phonebook';
import PrivateRoute from './PrivateRoute/PrivateRoute';
import PublicRoute from './PublicRoute/PublicRoute';

export const App = () => {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Phonebook />
            </PrivateRoute>
          }
        />
        
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route
          path="/signup"
          element={
            <PublicRoute>
              <Signup />
            </PublicRoute>
          }
        />
      </Routes>
    </div>
  );
};

