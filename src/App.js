import './App.css';
import Home from './components/Home';
import About from './components/About';
import Nav from './components/Nav';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import NoteState from './context/NoteState';
import Login from './components/Login';
import Signup from './components/Signup';

// 🔹 Navbar control component
function Layout() {
  const location = useLocation();

  const hideNavbar =
    location.pathname === '/' ||
    location.pathname === '/login' ||
    location.pathname === '/signup';

  return (
    <>
      {!hideNavbar && <Nav />}

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <Router>
      {/* ✅ Router ke ANDAR NoteState */}
      <NoteState>
        <Layout />
      </NoteState>
    </Router>
  );
}

export default App;
