import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RouterAdmin from './router/routerAdmin/view';
import PageSingIn from './screen/signIn/view';
import PageSignUp from './screen/signUp/view';
import RouterUser from './router/router user/view';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(true); // This is just a mock state

  // const [role, setRole] = useState('admin');

  const [role, setRole] = useState('user');

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<PageSingIn />} />
        <Route path="/sign-up" element={<PageSignUp />} />

        {/* <Route path="/*" element={isLoggedIn ? <RouterAdmin /> : <PageSingIn />} /> */}

        <Route
          path="/*"
          element={
            isLoggedIn ?
              (role === 'admin' ? <RouterAdmin /> : <RouterUser />) :
              <PageSingIn />
          }
        />

        <Route path="/dashboard-user/*" element={<RouterUser />} />
      </Routes>
    </Router>
  );
}

export default App;
