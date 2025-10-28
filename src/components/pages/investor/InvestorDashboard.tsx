import React, { useState, useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';
import Layout from '../../Layout/Layout';
import InvestorStatsCards from '../../components/investor/InvestorStatsCards';
import PortfolioOverview from '../../components/investor/PortfolioOverview';
import RecentActivity from '../../components/investor/RecentActivity';
import InvestmentOpportunities from '../../components/investor/InvestmentOpportunities';
import { InvestorDashboardStats, InvestmentRecord, Transaction, InvestmentOpportunity } from '../../types/investor';
import { investorAPI } from '../../services/investorAPI';
import { TrendingUp } from 'lucide-react';

const InvestorDashboard: React.FC = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState<InvestorDashboardStats>({
    totalInvested: 0,
    totalReturns: 0,
    activeInvestments: 0,
    completedInvestments: 0,
    averageROI: 0,
    portfolioValue: 0,
    monthlyReturns: 0,
    pendingReturns: 0,
  });
  const [portfolio, setPortfolio] = useState<InvestmentRecord[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [opportunities, setOpportunities] = useState<InvestmentOpportunity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        
        // Use mock data for now since backend might not have investor routes yet
        const [statsResponse, portfolioResponse, transactionsResponse, opportunitiesResponse] = await Promise.all([
          investorAPI.getDashboardStats(),
          investorAPI.getPortfolio(),
          investorAPI.getTransactions(),
          investorAPI.getInvestmentOpportunities()
        ]);

        // Set data from API responses
        if (statsResponse.success) setStats(statsResponse.data);
        if (portfolioResponse.success) setPortfolio(portfolioResponse.data);
        if (transactionsResponse.success) setTransactions(transactionsResponse.data);
        if (opportunitiesResponse.success) setOpportunities(opportunitiesResponse.data);

      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        // Fallback to mock data if API fails
        setStats({
          totalInvested: 250000,
          totalReturns: 45000,
          activeInvestments: 8,
          completedInvestments: 12,
          averageROI: 18.5,
          portfolioValue: 295000,
          monthlyReturns: 3500,
          pendingReturns: 15000,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const currentHour = new Date().getHours();
  const greeting = currentHour < 12 ? 'Good morning' : currentHour < 18 ? 'Good afternoon' : 'Good evening';

  return (
    <Layout>
      <div className="space-y-6">
        {/* Welcome Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">
                {greeting}, {user?.name || 'Investor'}! 💼
              </h1>
              <p className="text-blue-100 mt-1">
                Welcome to your investment dashboard. Track your agricultural investments and discover new opportunities.
              </p>
            </div>
            <div className="hidden md:block text-right">
              <div className="text-blue-100 text-sm">Portfolio Value</div>
              <div className="text-2xl font-bold">
                ₹{stats.portfolioValue.toLocaleString()}
              </div>
              <div className="text-blue-200 text-sm">
                +{stats.averageROI}% Average ROI
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <InvestorStatsCards stats={stats} loading={loading} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Portfolio Overview */}
          <div className="lg:col-span-2">
            <PortfolioOverview portfolio={portfolio} loading={loading} />
          </div>

          {/* Quick Stats Sidebar */}
          <div className="space-y-6">
            {/* Monthly Performance */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center space-x-2 mb-4">
                <TrendingUp className="h-5 w-5 text-green-600" />
                <h2 className="text-lg font-semibold text-gray-900">This Month</h2>
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
              ) : (
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Returns Received</span>
                    <span className="font-semibold text-green-600">
                      +₹{stats.monthlyReturns.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Pending Returns</span>
                    <span className="font-semibold text-orange-600">
                      ₹{stats.pendingReturns.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Active Investments</span>
                    <span className="font-semibold text-blue-600">
                      {stats.activeInvestments}
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Investment Opportunities */}
            <InvestmentOpportunities opportunities={opportunities} loading={loading} />
          </div>
        </div>

        {/* Recent Activity */}
        <RecentActivity transactions={transactions} loading={loading} />
      </div>
    </Layout>
  );
};

export default InvestorDashboard;