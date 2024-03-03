import{
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route
} from "react-router-dom";
import Home from './pages/Home/Home'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<Home></Home>}>
      <Route
        path="/"
        element={
          <>
            <h1>Hola Mundo</h1>
          </>
        }
      />
    </Route>
  )
)
function App() {
  return <RouterProvider router={router}/>

}

export default App;
