import { Routes, Route } from 'react-router-dom';
import Navbar from './components/navbar/navbar';
import loadere from '../src/img/loader.png'
import Sidebar from './components/sidebar/sidebar';
import Home from './pages/home';
import Addexp from './pages/addexp/addexp';
import Datanalysis from './pages/dataanalysis';
import { useEffect } from 'react';
import Login from './pages/login/login';
import Logout from './pages/logout';
import Report from './pages/Report';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Photo from './pages/photo';
import { useSelector, useDispatch } from 'react-redux';
import { setnarrow } from '../src/store/login';
import Officeexp from './pages/officeexp';
import Test from './pages/test';
import { userdata } from './store/api'
import { Errorpage } from './pages/Errorpage';
import Allexpense from './pages/admin/Allexpenses';
import Alluser from './pages/admin/alluser';
import Admin_Dashboard from './pages/admin/admin_Dashboard';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");
    token && dispatch(userdata());
  }, [])

  const log = useSelector((state) => state.login);

  // autocolse sidebar when screensize below 600px
  const sidebarclose = () => {
    const width = window.innerWidth;
    // console.log(width)
    width < 600 ? dispatch(setnarrow(true)) : null;
  }


  return (
    <>
      <ToastContainer closeOnClick={true} pauseOnFocusLoss={true} />
      <div className="App" >
        <Navbar />
        <div className={log.narrow ? "main narrow" : "main"} onClick={sidebarclose}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/addexpense" element={<Addexp />} />
            <Route path="/datanalysis" element={<Datanalysis />} />
            <Route path="/report" element={<Report />} />
            <Route path="/photo" element={<Photo />} />
            <Route path="/login" element={<Login />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/admin" >
              <Route path="dashboard" element={<Admin_Dashboard />} />
              <Route path="users" element={<Alluser />} />
              <Route path="expense" element={<Allexpense />} />
            </Route>
            <Route path="/print" element={<Officeexp />} />
            <Route path="/test" element={<Test />} />
            <Route path="*" element={<Errorpage />} />
          </Routes>
          <div style={{ display: log.loader ? "flex" : "none" }} className="loader"><img src={loadere} alt="" /></div>
        </div>
        <Sidebar />
      </div>
    </>
  );
}

export default App;
