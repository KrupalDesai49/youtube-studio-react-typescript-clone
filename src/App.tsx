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
import VideoUpload from "./pages/VideoUpload/VideoUpload";
import Content from "./pages/Content";
import ProtectedRoute from "./components/ProtectedRoute";
import VideoUploadDetails from "./pages/VideoUpload/VideoUploadDetails";
import UserProfile from "./pages/UserProfile/UserProfile";
import '@radix-ui/themes/styles.css';
import { Theme } from '@radix-ui/themes';

function App() {
  const [open, setOpen] = useState<boolean>(false);
  const [selectedType, setSelectedType] = useState<"Video" | "Short">("Video");
  const [linkId, setLinkId] = useState("pwsjvnADNGk");


  const handleTypeChange = (type: "Video" | "Short") => {
    setSelectedType(type);
  };

  const handleUploadVideoId = (id: string)=>{
    setLinkId(id)
  }

  return (
    <>
    <Theme>
      <AuthContextProvider>
        <Router>
          <div className="font-roboto relative flex h-screen flex-col bg-[#1f1f1f] text-white">
            <Navbar setOpen={setOpen} />
            <div className="relative flex flex-1 overflow-hidden">
              <SideBar open={open} setOpen={setOpen} />
              <Routes>
                <Route
                  path="/"
                  element={
                    <ProtectedRoute>
                      <Home />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/content"
                  element={
                    <ProtectedRoute>
                      <Content />
                    </ProtectedRoute>
                  }
                />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route
                  path="/upload"
                  element={
                    // <ProtectedRoute>
                      <VideoUpload
                        selectedType={selectedType}
                        handleTypeChange={handleTypeChange}
                        handleUploadVideoId={handleUploadVideoId}
                      />
                    // </ProtectedRoute>
                  }
                />
                <Route
                  path="/upload/details"
                  element={
                    // <ProtectedRoute>
                      <VideoUploadDetails  linkId={linkId} />
                    // </ProtectedRoute>
                  }
                />
                <Route
                  path="/profile"
                  element={
                    // <ProtectedRoute>
                      <UserProfile   />
                    // </ProtectedRoute>
                  }
                />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </div>
          </div>
        </Router>
      </AuthContextProvider>
      </Theme>
    </>
  );
}

export default App;
