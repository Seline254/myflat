import logo from './logo.svg';
import './App.css';
import { Route, Router } from 'react-router-dom';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomeComponent from './components/HomeComponent';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomeComponent/>}/>
        <Route path="/login" element={<LoginComponent />} />
        <Route path="/register" element={<RegisterComponent />} />
        {/* default routes */}
        <Route path="/not-authorized" element={<NotAuthorized />} />
        <Route path="*" element={<NotFound />} />

      </Routes>
    </Router>
  );
}

export default App;
