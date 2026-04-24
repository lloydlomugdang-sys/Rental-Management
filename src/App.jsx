import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Public & Auth Pages
import LandingPage from './pages/public/LandingPage';
import Browse from './pages/public/Browse'; 
import UnitDetails from './pages/public/UnitDetails'; 
import Login from './pages/auth/Login';
import Signup from './pages/auth/Signup';

// Tenant Interfaces
import TenantLayout from './pages/renter/TenantLayout';
import TenantDashboard from './pages/renter/TenantDashboard';
import Payments from './pages/renter/Payments';
import LeaseInfo from './pages/renter/LeaseInfo'; 
import Maintenance from './pages/renter/Maintenance';
import HelpReports from './pages/renter/HelpReports';


function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/browse" element={<Browse />} /> 
        <Route path="/units/:id" element={<UnitDetails />} /> 
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        

        {/* Protected Tenant Routes */}
        <Route path="/tenant" element={<TenantLayout />}>
          <Route path="dashboard" element={<TenantDashboard />} />
          <Route path="payments" element={<Payments />} />
          <Route path="lease" element={<LeaseInfo />} /> 
          <Route path="maintenance" element={<Maintenance />} />
          <Route path="help" element={<HelpReports />} />
        </Route>

      </Routes>
    </Router>
  );
}

export default App;