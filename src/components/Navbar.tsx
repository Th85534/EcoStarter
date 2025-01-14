import { Leaf, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { useAuthStore } from '../store/authStore';
import { Link } from 'react-router-dom';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user } = useAuthStore();

  return (
    <nav className="bg-green-50 backdrop-blur-md bg-opacity-50 fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to={user ? "/dashboard" : "/"} className="flex items-center">
              <Leaf className="h-8 w-8 text-green-600" />
              <span className="ml-2 text-xl font-bold text-green-800">EcoStarter</span>
            </Link>
          </div>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <Link 
                to={user ? "/dashboard" : "/"} 
                className="text-green-700 hover:text-green-900 px-3 py-2 rounded-md font-medium"
              >
                {user ? "Dashboard" : "Home"}
              </Link>
              <Link to="/personal-challenges" className="text-green-700 hover:text-green-900 px-3 py-2 rounded-md font-medium">Challenges</Link>
              <Link to="/resources" className="text-green-700 hover:text-green-900 px-3 py-2 rounded-md font-medium">Resources</Link>
              <Link to="/community" className="text-green-700 hover:text-green-900 px-3 py-2 rounded-md font-medium">Community</Link>
              {!user && (
                <Link to="/signup" className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors">
                  Get Started
                </Link>
              )}
            </div>
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-green-700 hover:text-green-900"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-green-50">
            <Link 
              to={user ? "/dashboard" : "/"} 
              className="text-green-700 hover:text-green-900 block px-3 py-2 rounded-md font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              {user ? "Dashboard" : "Home"}
            </Link>
            <Link 
              to="/challenges" 
              className="text-green-700 hover:text-green-900 block px-3 py-2 rounded-md font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Challenges
            </Link>
            <Link 
              to="/resources" 
              className="text-green-700 hover:text-green-900 block px-3 py-2 rounded-md font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Resources
            </Link>
            <Link 
              to="/community" 
              className="text-green-700 hover:text-green-900 block px-3 py-2 rounded-md font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Community
            </Link>
            {!user && (
              <Link 
                to="/signup" 
                className="w-full bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors block text-center"
                onClick={() => setIsMenuOpen(false)}
              >
                Get Started
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}