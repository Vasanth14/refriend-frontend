import { BrowserRouter, Route, Routes } from "react-router-dom";
import { RecoilRoot } from "recoil";
import Dashboard from "./Components/Dashboard";
import PrivateRoute from "./Components/PrivateRoute";
import Signin from "./Components/Signin";
import Signup from "./Components/Signup";
import { Toaster } from "react-hot-toast";
import Jobs from "./Components/Jobs";

function App() {
  return (
    <RecoilRoot>
      <BrowserRouter>
        <Routes>
          <Route
            path="/signin"
            element={
              <div className="flex justify-center h-[100vh] items-center bg-slate-800">
                <Signin />
              </div>
            }
          />
          <Route
            path="/signup"
            element={
              <div className="flex justify-center h-[100vh] items-center bg-slate-800">
                <Signup />
              </div>
            }
          />
          <Route path="/jobs/:id" element={<Jobs />} />
          <Route element={<PrivateRoute />}>
            <Route path="/" Component={Dashboard} />
          </Route>
        </Routes>
        <Toaster />
      </BrowserRouter>
    </RecoilRoot>
  );
}

export default App;
