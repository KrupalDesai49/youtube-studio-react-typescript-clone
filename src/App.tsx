import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import { AuthContextProvider } from "./components/AuthContext";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import Signup from "./pages/Signup";
import SideBar from "./components/SideBar";
import { useState } from "react";
import VideoUpload from "./pages/VideoUpload";
import Content from "./pages/Content";
import ProtectedRoute from "./components/ProtectedRoute";
function App() {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <>
      <AuthContextProvider>
        <Router>
          <div className=" flex min-h-screen flex-col text-white font-roboto bg-[#1f1f1f]">
            <Navbar setOpen={setOpen} />
            <div className="flex relative flex-1">
              <SideBar open={open} setOpen={setOpen}/>
              <Routes>
                <Route  path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
                <Route  path="/content" element={<ProtectedRoute><Content /></ProtectedRoute>} />
                <Route  path="/login" element={<Login />} />
                <Route  path="/signup" element={<Signup />} />
                <Route  path="/upload" element={<ProtectedRoute><VideoUpload /></ProtectedRoute>} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </div>
          </div>
        </Router>
      </AuthContextProvider>
    </>
  );
}

export default App;
