import Login from "./pages/login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Find from "./pages/Find";
import FullProfile from "./pages/FullProfile";
import EditUser from "./pages/EditUser"
import {BrowserRouter, Route, Routes} from 'react-router-dom'

function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route exact path ="/" element = {<Home/>}/>
          <Route path = "/login" element = {<Login/>}/>
          <Route path = "/profile/:id" element = {<FullProfile/>}/>
          <Route path = "/register" element = {<Register/>}/>
          <Route path = "/find" element = {<Find/>}/>
          <Route path = "/find/:category" element = {<Find/>}/>
          <Route path = "/edit/:id" element = {<EditUser/>}/>
        </Routes>
      </BrowserRouter>
  );
}

export default App;
