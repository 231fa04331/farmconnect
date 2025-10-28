// frontend/src/components/Dashboard/QuickActions.tsx
import React from 'react';
import { Plus, User, MessageCircle, FileText, TrendingUp, Settings } from 'lucide-react';

interface QuickActionsProps {
  navigate: (path: string) => void;
}

const QuickActions: React.FC<QuickActionsProps> = ({ navigate }) => {
  const actions = [
    {
      title: 'Apply for Loan',
      description: 'Start a new loan application',
      icon: Plus,
      href: '/apply-loan', // CORRECTED ROUTE
      color: 'bg-green-600 hover:bg-green-700',
      primary: true,
    },
    {
      title: 'View Profile',
      description: 'Manage your farmer profile',
      icon: User,
      href: '/profile', // CORRECTED ROUTE
      color: 'bg-blue-600 hover:bg-blue-700',
    },
    {
      title: 'My Loans',
      description: 'Track all your loans',
      icon: FileText,
      href: '/my-loans', // CORRECTED ROUTE
      color: 'bg-purple-600 hover:bg-purple-700',
    },
    {
      title: 'Progress Updates',
      description: 'Update crop progress',
      icon: TrendingUp,
      href: '/progress-updates', // CORRECTED ROUTE
      color: 'bg-orange-600 hover:bg-orange-700',
    },
    {
      title: 'Message Investors',
      description: 'Connect with investors',
      icon: MessageCircle,
      href: '/investor-messages', // CORRECTED ROUTE
      color: 'bg-indigo-600 hover:bg-indigo-700',
    },
    {
      title: 'Settings',
      description: 'Account preferences',
      icon: Settings,
      href: '/settings', // CORRECTED ROUTE
      color: 'bg-gray-600 hover:bg-gray-700',
    },
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {actions.map((action, index) => {
          const Icon = action.icon;
          return (
            <button
              key={index}
              onClick={() => navigate(action.href)}
              className={`${
                action.primary
                  ? 'col-span-1 md:col-span-2 lg:col-span-1'
                  : ''
              } group relative overflow-hidden rounded-lg p-6 text-white transition-all duration-200 hover:scale-105 hover:shadow-lg ${
                action.color
              } text-left w-full`}
            >
              <div className="flex items-center space-x-3">
                <Icon className="h-6 w-6 flex-shrink-0" />
                <div className="min-w-0 flex-1">
                  <h3 className="font-medium truncate">{action.title}</h3>
                  <p className="text-sm opacity-90 truncate">{action.description}</p>
                </div>
              </div>
              
              {/* Hover effect overlay */}
              <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-200"></div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default QuickActions;