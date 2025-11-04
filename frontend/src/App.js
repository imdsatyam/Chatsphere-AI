import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CreateAccount from "./components/CreateAccount";
import ForgotPassword from "./components/ForgotPassword";
import AppChat from "./components/AppChat";
import Login from "./components/Login";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/chat" element={<AppChat />} />
        <Route path="/signup" element={<CreateAccount />} />
        <Route path="/forgot" element={<ForgotPassword />} />
      </Routes>
    </Router>
  );
}
export default App;
