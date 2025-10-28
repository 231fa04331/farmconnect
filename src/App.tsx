// frontend/src/App.tsx
import { Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import FarmerSignup from './components/Auth/FarmerSignup';
import InvestorSignup from './components/Auth/InvestorSignup';
import SignIn from './components/Auth/SignIn';
import ProtectedRoute from './components/ProtectedRoute';

// Import farmer module components
import FarmerDashboard from './components/Dashboard/Dashboard';
import LoanApplication from './components/LoanApplication/steps/ApplicationWizard';

import MyLoans from './components/pages/MyLoans';
import LoanDetails from './components/pages/LoanDetails'; 
import Profile from './components/pages/Profile';
import Settings from './components/pages/Settings';

function App() {
  return (
    <Routes>
      {/* EXISTING ROUTES */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/signup/farmer" element={<FarmerSignup />} />
      <Route path="/signup/investor" element={<InvestorSignup />} />
      <Route path="/signin" element={<SignIn />} />
      
      {/* FARMER DASHBOARD ROUTES */}
      <Route 
        path="/farmer-dashboard" 
        element={
          <ProtectedRoute requiredUserType="farmer">
            <FarmerDashboard />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/apply-loan" 
        element={
          <ProtectedRoute requiredUserType="farmer">
            <LoanApplication />
          </ProtectedRoute>
        } 
      />
      
      {/* CORRECTED ROUTES - REMOVED DUPLICATES */}
      <Route 
        path="/my-loans" 
        element={
          <ProtectedRoute requiredUserType="farmer">
            <MyLoans />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/loan-details/:id" 
        element={
          <ProtectedRoute requiredUserType="farmer">
            <LoanDetails />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/profile" 
        element={
          <ProtectedRoute requiredUserType="farmer">
            <Profile />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/settings" 
        element={
          <ProtectedRoute requiredUserType="farmer">
            <Settings />
          </ProtectedRoute>
        } 
      />
      
      {/* ADDITIONAL ROUTES */}
      <Route 
        path="/progress-updates" 
        element={
          <ProtectedRoute requiredUserType="farmer">
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
              <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
                <h1 className="text-2xl font-bold text-green-600 mb-4">Progress Updates</h1>
                <p className="text-gray-600">Progress tracking page - Coming soon!</p>
              </div>
            </div>
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/investor-messages" 
        element={
          <ProtectedRoute requiredUserType="farmer">
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
              <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
                <h1 className="text-2xl font-bold text-green-600 mb-4">Investor Messages</h1>
                <p className="text-gray-600">Messaging page - Coming soon!</p>
              </div>
            </div>
          </ProtectedRoute>
        } 
      />
    </Routes>
  );
}

export default App;