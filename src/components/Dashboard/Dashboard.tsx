import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../Layout/Layout';
import StatsCards from './StatsCards';
import LoanStatusCards from './LoanStatusCards';
import QuickActions from './QuickActions';
import { DashboardStats, Loan } from '../../components/types';
import { loanApplicationApi } from '../services/api';
import { Calendar, Bell } from 'lucide-react';
import { format } from 'date-fns';

// Define interface for raw API loan data
interface ApiLoanData {
  _id?: string;
  id?: string;
  purpose: string;
  amount: number;
  status: 'pending' | 'approved' | 'rejected' | 'active' | 'completed' | 'disbursed';
  cropType: string;
  acreage: number;
  duration: number;
  appliedAt?: string;
  createdAt?: string;
  repaymentSchedule?: Array<{
    id: string;
    dueDate: string;
    amount: number;
    status: 'pending' | 'paid' | 'overdue';
  }>;
  expectedYield?: number;
  expectedMarketPrice?: number;
  productionCost?: number;
  expectedProfit?: number;
  interestRate?: number;
  season?: string;
}

// Add transformApiLoan function directly here
const transformApiLoan = (apiLoan: ApiLoanData): Loan => {
  return {
    id: apiLoan._id || apiLoan.id || '',
    purpose: apiLoan.purpose,
    amount: apiLoan.amount,
    status: apiLoan.status,
    cropType: apiLoan.cropType,
    acreage: apiLoan.acreage,
    duration: apiLoan.duration,
    appliedAt: apiLoan.appliedAt || apiLoan.createdAt || new Date().toISOString(),
    repaymentSchedule: apiLoan.repaymentSchedule || [],
    expectedYield: apiLoan.expectedYield || 0,
    expectedMarketPrice: apiLoan.expectedMarketPrice || 0,
    productionCost: apiLoan.productionCost || 0,
    expectedProfit: apiLoan.expectedProfit || 0,
    interestRate: apiLoan.interestRate || 12,
    season: apiLoan.season || '2024-2025'
  };
};

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const userData = localStorage.getItem('user');
  const user = userData ? JSON.parse(userData) : null;
  
  const [stats, setStats] = useState<DashboardStats>({
    totalLoans: 0,
    activeLoans: 0,
    amountFunded: 0,
    repaymentRate: 0,
  });
  const [loans, setLoans] = useState<Loan[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        
        // REAL API CALLS - Fetch both stats and recent loans
        const [statsResponse, loansResponse] = await Promise.all([
          loanApplicationApi.getDashboardStats(),
          loanApplicationApi.getRecentApplications()
        ]);

        console.log('📊 Dashboard stats response:', statsResponse);
        console.log('📋 Recent loans response:', loansResponse);

        // If API fails, use fallback data
        if (statsResponse.success && statsResponse.data) {
          setStats(statsResponse.data);
        } else {
          console.log('⚠️ Using fallback stats data');
          setStats({
            totalLoans: 3,
            activeLoans: 1,
            amountFunded: 150000,
            repaymentRate: 95,
          });
        }

        if (loansResponse.success && loansResponse.data) {
          // FIXED: loansResponse.data is now directly the array of loans
          const transformedLoans: Loan[] = loansResponse.data.map((loan: ApiLoanData) => transformApiLoan(loan));
          console.log('🔄 Transformed loans for dashboard:', transformedLoans);
          setLoans(transformedLoans);
        } else {
          console.log('⚠️ Using fallback loans data');
          // Fallback mock data
          const mockLoans: Loan[] = [
            {
              id: '1',
              purpose: 'Wheat Cultivation',
              amount: 50000,
              status: 'active',
              cropType: 'Wheat',
              acreage: 10,
              duration: 12,
              appliedAt: new Date().toISOString(),
              repaymentSchedule: [],
              expectedYield: 3000,
              expectedMarketPrice: 25,
              productionCost: 35000,
              expectedProfit: 15000,
              interestRate: 8.5,
              season: '2024-2025'
            }
          ];
          setLoans(mockLoans);
        }
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        // Fallback to mock data
        setStats({ totalLoans: 3, activeLoans: 1, amountFunded: 150000, repaymentRate: 95 });
        setLoans([]);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const upcomingPayments = loans
    .filter((loan) => loan.status === 'active')
    .flatMap((loan) =>
      loan.repaymentSchedule?.filter((payment) => payment.status === 'pending')
        .map((payment) => ({ ...payment, loanPurpose: loan.purpose })) || []
    )
    .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime())
    .slice(0, 3);

  const currentHour = new Date().getHours();
  const greeting = currentHour < 12 ? 'Good morning' : currentHour < 18 ? 'Good afternoon' : 'Good evening';

  return (
    <Layout>
      <div className="space-y-6">
        {/* Welcome Header */}
        <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-lg p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">
                {greeting}, {user?.name || 'Farmer'}! 🌱
              </h1>
              <p className="text-green-100 mt-1">
                Welcome back to your AgriFund dashboard. Here's what's happening with your farming journey.
              </p>
            </div>
            <div className="hidden md:block text-right">
              <div className="text-green-100 text-sm">Today's Date</div>
              <div className="text-xl font-semibold">
                {format(new Date(), 'MMM dd, yyyy')}
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <StatsCards stats={stats} loading={loading} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Loan Status Cards */}
          <div className="lg:col-span-2">
            <LoanStatusCards loans={loans} loading={loading} />
          </div>

          {/* Upcoming Payments */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center space-x-2 mb-4">
              <Bell className="h-5 w-5 text-orange-600" />
              <h2 className="text-lg font-semibold text-gray-900">Upcoming Payments</h2>
            </div>
            {loading ? (
              <div className="space-y-3">
                {[...Array(3)].map((_, index) => (
                  <div key={index} className="animate-pulse">
                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                  </div>
                ))}
              </div>
            ) : upcomingPayments.length === 0 ? (
              <div className="text-center py-6">
                <Calendar className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-500 text-sm">No upcoming payments</p>
              </div>
            ) : (
              <div className="space-y-3">
                {upcomingPayments.map((payment) => (
                  <div key={payment.id} className="border-l-4 border-orange-400 pl-4 py-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium text-gray-900">₹{payment.amount.toLocaleString()}</p>
                        <p className="text-sm text-gray-600">{payment.loanPurpose}</p>
                      </div>
                      <span className="text-xs text-gray-500">
                        {format(new Date(payment.dueDate), 'MMM dd')}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Quick Actions - Pass navigate function */}
        <QuickActions navigate={navigate} />
      </div>
    </Layout>
  );
};

export default Dashboard;