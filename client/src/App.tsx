import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Root from './pages/Root/Root';
import CustomNavbar from './components/Navbar/Navbar';
import Home from './pages/Home/Home';
import {SignUpForm}  from './components/Auth/SignUp';
import Footer from './components/Footer/Footer'
function App() {
  return (
    <Router>
      <Routes>
        <Route element={<Root />}>
          <Route
            path="/"
            element={
              <>
                <CustomNavbar />
                <Home />
                <Footer/>
              </>
            }
          />
          {/* Add more routes as needed */}
        </Route>
        <Route path="/signup" element={<SignUpForm />} />
      </Routes>
    </Router>
  );
}

export { App };
