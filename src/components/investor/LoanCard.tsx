import React from 'react';
import { Link } from 'react-router-dom';
import { MarketplaceLoan } from '../../types/investor';
import { 
  MapPin, 
  Clock, 
  TrendingUp, 
  Shield, 
  User, 
  Star,
  Calendar,
  Target,
  CheckCircle
} from 'lucide-react';

interface LoanCardProps {
  loan: MarketplaceLoan;
}

const LoanCard: React.FC<LoanCardProps> = ({ loan }) => {
  const fundingProgress = (loan.amountFunded / loan.amount) * 100;
  
  // Calculate days left without date-fns dependency
  const calculateDaysLeft = (deadline: string) => {
    const deadlineDate = new Date(deadline);
    const today = new Date();
    const diffTime = deadlineDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };
  
  const daysLeft = calculateDaysLeft(loan.fundingDeadline);
  
  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'low':
        return 'text-green-600 bg-green-50 border-green-200';
      case 'medium':
        return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'high':
        return 'text-red-600 bg-red-50 border-red-200';
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getVerificationBadges = (badges: string[]) => {
    const badgeConfig = {
      identity: { icon: CheckCircle, label: 'ID Verified', color: 'text-green-600' },
      land: { icon: Shield, label: 'Land Verified', color: 'text-blue-600' },
      bank: { icon: Target, label: 'Bank Verified', color: 'text-purple-600' },
      phone: { icon: CheckCircle, label: 'Phone Verified', color: 'text-green-600' },
      premium: { icon: Star, label: 'Premium Farmer', color: 'text-yellow-600' },
    };

    return badges.slice(0, 3).map((badge) => {
      const config = badgeConfig[badge as keyof typeof badgeConfig];
      if (!config) return null;
      
      const Icon = config.icon;
      return (
        <div key={badge} className="flex items-center space-x-1" title={config.label}>
          <Icon className={`h-3 w-3 ${config.color}`} />
        </div>
      );
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow">
      {/* Header */}
      <div className="p-6 pb-4">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center">
              <User className="h-6 w-6 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">{loan.farmer.name}</h3>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <MapPin className="h-3 w-3" />
                <span>{loan.farmer.location}</span>
                <span>•</span>
                <span>{loan.farmer.experience} years exp</span>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-1">
            {getVerificationBadges(loan.farmer.verificationBadges)}
          </div>
        </div>

        {/* Farmer Stats */}
        <div className="grid grid-cols-3 gap-2 mb-4 p-3 bg-gray-50 rounded-lg">
          <div className="text-center">
            <p className="text-xs text-gray-500">Credit Score</p>
            <p className="font-semibold text-sm">{loan.farmer.creditScore}</p>
          </div>
          <div className="text-center">
            <p className="text-xs text-gray-500">Success Rate</p>
            <p className="font-semibold text-sm text-green-600">{loan.farmer.repaymentRate}%</p>
          </div>
          <div className="text-center">
            <p className="text-xs text-gray-500">Loans</p>
            <p className="font-semibold text-sm">{loan.farmer.successfulLoans}</p>
          </div>
        </div>

        {/* Loan Details */}
        <div className="space-y-3">
          <div>
            <h4 className="font-medium text-gray-900 mb-1">{loan.purpose}</h4>
            <p className="text-sm text-gray-600">{loan.cropType} • {loan.acreage} acres • {loan.season}</p>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-gray-500">Loan Amount</p>
              <p className="font-semibold text-lg">₹{loan.amount.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Expected ROI</p>
              <div className="flex items-center space-x-1">
                <TrendingUp className="h-4 w-4 text-green-600" />
                <p className="font-semibold text-lg text-green-600">{loan.expectedROI}%</p>
              </div>
            </div>
          </div>

          {/* Risk and Duration */}
          <div className="flex items-center justify-between">
            <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getRiskColor(loan.riskLevel)}`}>
              {loan.riskLevel.charAt(0).toUpperCase() + loan.riskLevel.slice(1)} Risk
            </span>
            <div className="flex items-center space-x-1 text-sm text-gray-600">
              <Clock className="h-4 w-4" />
              <span>{loan.duration} months</span>
            </div>
          </div>
        </div>
      </div>

      {/* Funding Progress */}
      <div className="px-6 pb-4">
        <div className="mb-2">
          <div className="flex justify-between text-sm mb-1">
            <span className="text-gray-600">Funding Progress</span>
            <span className="font-medium">
              {fundingProgress.toFixed(1)}% • ₹{loan.amountRemaining.toLocaleString()} remaining
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${Math.min(fundingProgress, 100)}%` }}
            ></div>
          </div>
        </div>

        {/* Investors */}
        {loan.investors.length > 0 && (
          <div className="flex items-center justify-between text-sm text-gray-600">
            <span>{loan.investors.length} investors</span>
            <span>Min: ₹{loan.minimumInvestment.toLocaleString()}</span>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="px-6 py-4 bg-gray-50 rounded-b-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-1 text-sm text-gray-600">
            <Calendar className="h-4 w-4" />
            <span>
              {daysLeft > 0 ? `${daysLeft} days left` : 'Deadline passed'}
            </span>
          </div>
          <Link
            to={`/investor/marketplace/${loan.id}`}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm font-medium"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoanCard;