import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import Projects from "./components/Projects";
import Form from "./components/Form";
import Chart from "./components/Chart";

function PrivateRoute({ children }) {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/login" replace />;
}

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route path="/" element={<PrivateRoute><Dashboard /></PrivateRoute>}>
        <Route index element={<PrivateRoute><Chart /></PrivateRoute>} />
        <Route path="projects" element={<PrivateRoute><Projects /></PrivateRoute>} />
        <Route path="addproject" element={<PrivateRoute><Form /></PrivateRoute>} />
        <Route path="projects/edit/:id" element={<PrivateRoute><Form /></PrivateRoute>} />
      </Route>
    </Routes>
  );
}

export default App;