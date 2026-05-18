import { Routes, Route } from "react-router-dom";
import PublicRoutes from "./routes/public";
// import CustomerRoutes from "./routes/customer";
import AdminRoutes from "./routes/admin";

function App() {
  return (
    <Routes>
      <Route path="/*" element={<PublicRoutes />} />
      {/* <Route path="/customer/*" element={<CustomerRoutes />} /> */}
      <Route path="/admin/*" element={<AdminRoutes />} />
    </Routes>
  );
}

export default App;