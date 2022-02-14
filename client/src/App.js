import './App.css';
import { Route,Routes } from 'react-router-dom';
import Home from './pages/Home'
import Register from './pages/Register';
import Login from './pages/Login'
import Product from './pages/CreateProduct'
import Contact from './pages/Contact'
import Navbar from './components/Navbar';
import Profile from './pages/Profile';
import Dashboard from './pages/Dashboard'
import ProtectedRoute from './components/ProtectedRoute';
import ProtectedRouteAdmin from './components/ProtectedRoute';
import Technicien from './pages/Technicien';

function App() {
  return (
    <div className="App">
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/Register' element={<Register/>}/>
        <Route path='/Login' element={<Login/>}/>
        <Route path='/Product' element={<Product/>}/>
        <Route path='/Contact' element={<Contact/>}/>

        <Route element={<ProtectedRoute/>}>
        <Route path='/Profile' element={<Profile/>}/>
        </Route>
        <Route element={<ProtectedRouteAdmin/>}>
        <Route path='/Dashboard' element={<Dashboard/>}/>
        </Route>
        <Route element={<ProtectedRoute/>}>
        <Route path='/Technicien' element={<Technicien/>}/>
        </Route>

      </Routes>
    </div>
  );
}

export default App;
