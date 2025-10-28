import { Sprout, TrendingUp, Users, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section className="relative min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 flex items-center justify-center overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-32 h-32 bg-green-600 rounded-full"></div>
        <div className="absolute top-40 right-20 w-20 h-20 bg-emerald-400 rounded-full"></div>
        <div className="absolute bottom-20 left-1/4 w-16 h-16 bg-green-500 rounded-full"></div>
        <div className="absolute bottom-40 right-1/3 w-24 h-24 bg-emerald-300 rounded-full"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Logo/Brand */}
        <div className="flex items-center justify-center mb-8">
          <Sprout className="h-12 w-12 text-green-600 mr-3" />
          <h1 className="text-4xl font-bold text-gray-900">AgriFund</h1>
        </div>

        {/* Main Headline */}
        <h2 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
          Empowering Farmers,{' '}
          <span className="text-green-600">Connecting Investors</span>
        </h2>

        {/* Subtitle */}
        <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
          A peer-to-peer agricultural financing platform bridging the gap between farmers seeking capital and investors seeking impact.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
          <Link
            to="/signup/farmer"
            className="group bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg flex items-center"
          >
            <Users className="mr-2 h-5 w-5" />
            Get Started as Farmer
            <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
          </Link>
          <Link
            to="/signup/investor"
            className="group bg-white hover:bg-green-50 text-green-600 border-2 border-green-600 px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg flex items-center"
          >
            <TrendingUp className="mr-2 h-5 w-5" />
            Invest Now
            <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Trust Indicators */}
        <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto text-center">
          <div className="bg-white/80 backdrop-blur-sm rounded-lg p-6 shadow-sm">
            <div className="text-3xl font-bold text-green-600 mb-2">10K+</div>
            <div className="text-gray-600">Farmers Served</div>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-lg p-6 shadow-sm">
            <div className="text-3xl font-bold text-green-600 mb-2">$50M+</div>
            <div className="text-gray-600">Funds Raised</div>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-lg p-6 shadow-sm">
            <div className="text-3xl font-bold text-green-600 mb-2">95%</div>
            <div className="text-gray-600">Success Rate</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;