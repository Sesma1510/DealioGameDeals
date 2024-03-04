// App.tsx
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route
} from "react-router-dom";
import Root from './pages/Root/Root';
import CustomNavbar from './components/Navbar/Navbar'; // Asegúrate de que la ruta sea correcta
import Home from './pages/Home/Home'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<Root/>}>
      <Route
        path="/"
        element={
          <>
            <CustomNavbar/>
            <Home/>
          </>
        }
      />
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
