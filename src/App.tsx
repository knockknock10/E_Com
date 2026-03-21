import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import Auth from './pages/Auth';

const MainLayout = () => (
  <>
    <Navbar />
    <main className="relative">
      <Home />
    </main>
    <Footer />
  </>
);

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-primary text-dark font-sans selection:bg-accent/30 overflow-x-hidden">
        <Routes>
          <Route path="/" element={<MainLayout />} />
          <Route path="/auth" element={<Auth />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
