import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'

// Layout components (appear on all pages)
import TopHeaderBar from './components/TopHeaderBar'
import Header from './components/Header'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'

// Page components
import HomePage from './pages/HomePage'
import FosaProducts from './pages/FosaProducts'
import BosaProducts from './pages/BosaProducts'
import InsurancePage from './pages/InsurancePage'
import Mchuna from './pages/Mchuna'
import DownloadsPage from './pages/DownloadsPage'
import WhoWeAre from './pages/WhoWeAre'
import BoardOfDirectors from './pages/BoardOfDirectors'
import SupervisoryCommittee from './pages/SupervisoryCommittee'
import MembershipPage from './pages/MembershipPage'
import StaffPage from './pages/StaffPage'
import DepartmentsPage from './pages/DepartmentsPage'

// Admin Dashboard 
import UnifiedAdminDashboard from './components/UnifiedAdminDashboard'

// Layout wrapper component
function Layout({ children }) {
  const location = useLocation();
  
  // Define routes that should NOT have header/footer
  const noLayoutRoutes = ['/admin'];
  
  // Check if current path should exclude layout
  const shouldHideLayout = noLayoutRoutes.some(route => 
    location.pathname.startsWith(route)
  );

  if (shouldHideLayout) {
    return <>{children}</>;
  }

  return (
    <>
      <TopHeaderBar />
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}

function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen bg-gray-50">
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/fosaProducts" element={<FosaProducts />} />
            <Route path="/bosaProducts" element={<BosaProducts />} />
            <Route path="/insurance" element={<InsurancePage />} />
            <Route path="/mchuna" element={<Mchuna />} />
            <Route path="/downloads" element={<DownloadsPage />} />
            <Route path="/WhoWeAre" element={<WhoWeAre />} />
            <Route path="/boardofdirectors" element={<BoardOfDirectors />} />
            <Route path="/supervisorycommittee" element={<SupervisoryCommittee />} />
            <Route path="/membership" element={<MembershipPage />} />
            <Route path="/staff" element={<DepartmentsPage/>} />

            
            {/* Unified Admin Dashboard - NO header/footer */}
            <Route path="/admin" element={<UnifiedAdminDashboard />} />

          </Routes>
        </Layout>
      </div>
    </Router>
  )
}

export default App