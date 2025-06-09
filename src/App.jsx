

import { useEffect, useState } from 'react';
import { Routes, Route, useLocation, matchPath } from 'react-router-dom';

import Homepage from './Components/Homepage';
import Tshirts from './Components/Tshirts';
import Login from './Components/Login';
import Register from './Components/Register';
import Tdetails from './Components/Tdetails';
import Cart from './Components/Cart';
import Checkout from './Components/Checkout';
import Fullsleeve from './Components/FullSleeve';
import Halfsleeve from './Components/Halfsleeve';
import Oversized from './Components/Oversized';
import Formal from './Components/Formal';
import FullScreenLoader from './Components/FullScreenLoader'; 
import Sport from './Components/Sport';
import Marvel from './Components/Marvel';
import Dashboard from './Adminpanel/Dashboard';
import AddTshirtForm from './Adminpanel/AddTshirtForm';
import UpdateTshirts from './Adminpanel/UpdateTshirts';
import Myoreder from './Components/Myoreder';

function App() {
  const location = useLocation();
  const [loading, setLoading] = useState(false);

  const hideNavbarRoutes = ['/login', '/register','/checkout','/cart','/admin','/addnewtshirt','/marvel','/update','/myorder'];
  const hideDynamicRoutes = ['/tshirt/:id'];

  const shouldHideStatic = hideNavbarRoutes.includes(location.pathname.toLowerCase());
  const shouldHideDynamic = hideDynamicRoutes.some((pattern) =>
    matchPath({ path: pattern, end: true }, location.pathname)
  );

  const shouldHideNavbar = shouldHideStatic || shouldHideDynamic;

  // Detect route change and trigger loader
  useEffect(() => {
    setLoading(true);
    const timeout = setTimeout(() => setLoading(false), 300); // simulate loading delay
    return () => clearTimeout(timeout);
  }, [location]);

  return (
    <>
      {loading && <FullScreenLoader />}
      {!shouldHideNavbar && <Homepage />}

      <Routes>
        <Route path="/" element={<Tshirts />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/tshirt/:id" element={<Tdetails />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/fullsleeve" element={<Fullsleeve />} />
        <Route path="/halfsleeve" element={<Halfsleeve />} />
        <Route path='/oversized' element={<Oversized />} />
        <Route path='/formal' element={<Formal />} />
        <Route path='/sport' element={<Sport/>}></Route>
        <Route path='/marvel'  element={<Marvel/>}></Route>
        <Route path='/admin' element={<Dashboard/>}></Route>
        <Route path='/addnewtshirt' element={<AddTshirtForm/>}></Route>
        <Route  path='/update' element={<UpdateTshirts/>}></Route>
        <Route path='/myorder' element={<Myoreder/>}></Route>
      </Routes>
    </>
  );
}

export default App;
