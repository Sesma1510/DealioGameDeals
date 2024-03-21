import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Root from './pages/Root/Root';
import Home from './pages/Home/Home';

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<Root />}>
          <Route
            path="/"
            element={
                <Home />
            }
          />
        </Route>
      </Routes>
    </Router>
  );
}

export { App };
