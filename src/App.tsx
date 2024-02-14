import { Theme } from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";
import { useState } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import { AuthContextProvider } from "./components/AuthContext";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import SideBar from "./components/SideBar";
import Content from "./pages/Content";
import Home from "./pages/Home";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import Signup from "./pages/Signup";
import UserProfile from "./pages/UserProfile/UserProfile";
import VideoUpload from "./pages/VideoUpload/VideoUpload";
import VideoUploadDetails from "./pages/VideoUpload/VideoUploadDetails";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [open, setOpen] = useState<boolean>(false);
  const [selectedType, setSelectedType] = useState<"Video" | "Short">("Video");
  const [linkId, setLinkId] = useState("pwsjvnADNGk");

  const handleTypeChange = (type: "Video" | "Short") => {
    setSelectedType(type);
  };

  const handleUploadVideoId = (id: string) => {
    setLinkId(id);
  };

  const successToast = (messaage: string) => {
    toast.success(messaage, {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
    console.log("toastttttttttt")
  };

  return (
    <>
      <Theme>
        <AuthContextProvider>
          <Router>
            <div className="relative font-roboto flex h-screen flex-col bg-[#1f1f1f] text-white">
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
                        linkId={linkId}
                      />
                      // </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/upload/details"
                    element={
                      // <ProtectedRoute>
                      <VideoUploadDetails
                        linkId={linkId}
                        successToast={successToast}
                      />
                      // </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/profile"
                    element={
                      // <ProtectedRoute>
                      <UserProfile />
                      // </ProtectedRoute>
                    }
                  />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </div>
              {/* <div className="z-[90000] absolute inset-0 mb-10">
                <ToastContainer />
                <h1 className="text-white">ddisxokwsn</h1>
              </div> */}
            </div>
          </Router>
        </AuthContextProvider>
      </Theme>
    </>
  );
}

export default App;
