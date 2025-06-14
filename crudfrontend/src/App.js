import EmpList from "./pages/EmpList";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Manage from "./pages/Manage";
import Add from "./pages/Add";
import Edit from "./pages/Edit";
import SignUP from "./pages/SignUP";
import SignIn from "./pages/SignIn";
// import { Link } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import Leave from "./pages/Leave";
import ManageLeaves from "./pages/ManageLeaves";
import LeaveRequest from "./pages/LeaveRequest";


function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<SignUP />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/employee" element={<EmpList />} />

          <Route path="/" element={<EmpList />} />
          <Route path="/manage" element={<Manage />} />
          <Route path="/add" element={<Add />} />
          {/* <Route path="/editemployee/:id" element={<Edit />} /> */}
          <Route path="/edit/:id" element={<Edit />} />

          {/* Leaves */}
          <Route path="/leaverequest" element={<LeaveRequest/>} />
          <Route path="/myleaves" element={<Leave/>} />
          <Route path="/manageleaves" element={<ManageLeaves/>} />


        </Routes>
      </BrowserRouter>
      <ToastContainer position="top-center" autoClose={3000} />

    </>
  );
}

export default App;
