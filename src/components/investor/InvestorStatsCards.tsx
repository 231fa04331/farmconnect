import React from 'react';
import { InvestorDashboardStats } from '../../types/investor';
import { TrendingUp, DollarSign, Target, PieChart, Users, Calendar } from 'lucide-react';

interface InvestorStatsCardsProps {
  stats: InvestorDashboardStats;
  loading: boolean;
}

const InvestorStatsCards: React.FC<InvestorStatsCardsProps> = ({ stats, loading }) => {
  const cards = [
    {
      title: 'Total Invested',
      value: stats.totalInvested,
      icon: DollarSign,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      format: 'currency',
    },
    {
      title: 'Total Returns',
      value: stats.totalReturns,
      icon: TrendingUp,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      format: 'currency',
    },
    {
      title: 'Portfolio Value',
      value: stats.portfolioValue,
      icon: PieChart,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      format: 'currency',
    },
    {
      title: 'Average ROI',
      value: stats.averageROI,
      icon: Target,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
      format: 'percentage',
    },
    {
      title: 'Active Investments',
      value: stats.activeInvestments,
      icon: Users,
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-50',
      format: 'number',
    },
    {
      title: 'Completed',
      value: stats.completedInvestments,
      icon: Calendar,
      color: 'text-teal-600',
      bgColor: 'bg-teal-50',
      format: 'number',
    },
  ];

  const formatValue = (value: number, format: string) => {
    switch (format) {
      case 'currency':
        return `₹${value.toLocaleString()}`;
      case 'percentage':
        return `${value}%`;
      default:
        return value.toLocaleString();
    }
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-6">
        {[...Array(6)].map((_, index) => (
          <div key={index} className="bg-white p-4 rounded-lg shadow-sm border animate-pulse">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-6 bg-gray-200 rounded w-1/2 mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
              </div>
              <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-6">
      {cards.map((card, index) => {
        const Icon = card.icon;
        return (
          <div
            key={index}
            className="bg-white p-4 rounded-lg shadow-sm border hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-600 mb-1">{card.title}</p>
                <p className="text-xl font-bold text-gray-900">
                  {formatValue(card.value, card.format)}
                </p>
              </div>
              <div className={`p-2 rounded-full ${card.bgColor}`}>
                <Icon className={`h-5 w-5 ${card.color}`} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default InvestorStatsCards;