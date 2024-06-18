import "./App.css";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import SignUpPage from "./pages/SignUpPage.tsx";
import DashBoard from "./pages/DashBoard.tsx";
import SignInPage from "./pages/SignInPage.tsx";
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<SignUpPage />} />
          <Route path="/dashboard" element={<DashBoard />} />
          <Route path="/login" element={<SignInPage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
/*

     <Route path="/dashboard" element={<DashBoard />} />
            <Route path="/dashboard/create/:id" element={<CreatePage />} />
  <Route path="/login" element={<SignInPage />}></Route>
*/
