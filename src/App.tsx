import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import Navbar from './myComponents/Navbar';
import { ClipLoader } from 'react-spinners';

// Lazy load the pages
const HomePage = lazy(() => import('./pages/HomePage'));
const BetPage = lazy(() => import('./pages/BetPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const MainBettingPage = lazy(() => import('./pages/MainBettingPage'));
const AdminPage = lazy(() => import('./pages/AdminPage'));

function App() {
  return (
    <>
      <Router>
        <Navbar />
        {/* Suspense component with fallback loader */}
        <Suspense fallback={
          <div className="flex justify-center items-center min-h-screen bg-[#121212]">
            <ClipLoader color="#4A90E2" size={150} />
          </div>
        }>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/bet-page" element={<BetPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/bet-page/mainBetting" element={<MainBettingPage />} />
            <Route path="/admin" element={<AdminPage />} />
          </Routes>
        </Suspense>
      </Router>
    </>
  );
}

export default App;
