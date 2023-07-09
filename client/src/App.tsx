import './App.css'
import {Layout} from "./Layout";
import {Route, Routes} from "react-router-dom";
import {IndexPage} from "./Content/IndexPage";
import {LoginPage} from "./LoginPage/LoginPage";

function App() {

  return (
      <Routes>
          <Route path='/' element={<Layout />}>
              <Route index element={<IndexPage/>}/>
              <Route path='/login' element={<LoginPage/>}/>
          </Route>
      </Routes>
  )
}

export default App
