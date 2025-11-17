import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { AuthProvider } from './context/AuthContext'

// Public Layout components
import TopHeaderBar from './components/TopHeaderBar'
import Header from './components/Header'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'

// Public Page components
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
import DepartmentsPage from './pages/DepartmentsPage'

// Admin components
import Login from './pages/admin/auth/Login'
import ProtectedRoute from './components/auth/ProtectedRoute'
import AdminLayout from './components/layout/Layout'
import Dashboard from './pages/admin/Dashboard'
import Sliders from './pages/admin/slider/Sliders'
import News from './pages/admin/news/News'
import Departments from './pages/admin/departments/Departments'
import Staff from './pages/admin/staff/Staff'

// Placeholder admin pages (we'll build these next)
// const News = () => <div className="card">News Page - Coming Soon</div>
// const Departments = () => <div className="card">Departments Page - Coming Soon</div>
// const Staff = () => <div className="card">Staff Page - Coming Soon</div>
const Board = () => <div className="card">Board Page - Coming Soon</div>
const Products = () => <div className="card">Products Page - Coming Soon</div>
const Forms = () => <div className="card">Forms Page - Coming Soon</div>
const About = () => <div className="card">About Page - Coming Soon</div>
const Values = () => <div className="card">Values Page - Coming Soon</div>
const Awards = () => <div className="card">Awards Page - Coming Soon</div>

// Public Layout wrapper component
function PublicLayout({ children }) {
  const location = useLocation()
  
  // Routes that should NOT have header/footer (admin routes)
  const noLayoutRoutes = ['/admin']
  
  // Check if current path should exclude layout
  const shouldHideLayout = noLayoutRoutes.some(route => 
    location.pathname.startsWith(route)
  )

  if (shouldHideLayout) {
    return <>{children}</>
  }

  return (
    <>
      <TopHeaderBar />
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  )
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <ScrollToTop />
        
        {/* Toast Notifications */}
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 3000,
            style: {
              background: '#363636',
              color: '#fff',
            },
            success: {
              duration: 3000,
              iconTheme: {
                primary: '#22c55e',
                secondary: '#fff',
              },
            },
            error: {
              duration: 4000,
              iconTheme: {
                primary: '#ef4444',
                secondary: '#fff',
              },
            },
          }}
        />

        <div className="min-h-screen bg-gray-50">
          <PublicLayout>
            <Routes>
              {/* ============ PUBLIC ROUTES ============ */}
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
              <Route path="/staff" element={<DepartmentsPage />} />

              {/* ============ ADMIN LOGIN (No Auth Required) ============ */}
              <Route path="/admin/login" element={<Login />} />

              {/* ============ ADMIN DASHBOARD (Protected) ============ */}
              <Route
                path="/admin"
                element={
                  <ProtectedRoute>
                    <AdminLayout />
                  </ProtectedRoute>
                }
              >
                <Route index element={<Navigate to="/admin/dashboard" replace />} />
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="sliders" element={<Sliders />} />
                <Route path="news" element={<News />} />
                <Route path="departments" element={<Departments />} />
                <Route path="staff" element={<Staff />} />
                <Route path="board" element={<Board />} />
                <Route path="products" element={<Products />} />
                <Route path="forms" element={<Forms />} />
                <Route path="about" element={<About />} />
                <Route path="values" element={<Values />} />
                <Route path="awards" element={<Awards />} />
              </Route>

              {/* ============ 404 - Catch All ============ */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </PublicLayout>
        </div>
      </AuthProvider>
    </Router>
  )
}

export default App
