import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Leaf, 
  Users, 
  TreePine, 
  Battery,
  BookOpen,
  User
} from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import { useUserStore } from '../store/userStore';

export default function Dashboard() {
  const user = useAuthStore(state => state.user);
  const { profile, fetchProfile } = useUserStore();
  useEffect(() => {
      fetchProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
  const menuItems = [
    {
      title: 'Lifestyle Analysis',
      icon: <Leaf className="h-6 w-6" />,
      description: 'Get personalized eco-friendly recommendations',
      link: '/lifestyle-analysis',
      color: 'bg-green-100 text-green-600'
    },
    {
      title: 'Personal Challenges',
      icon: <TreePine className="h-6 w-6" />,
      description: 'Track your daily eco-challenges',
      link: '/personal-challenges',
      color: 'bg-blue-100 text-blue-600'
    },
    {
      title: 'Community Space',
      icon: <Users className="h-6 w-6" />,
      description: 'Connect with other eco-conscious individuals',
      link: '/community',
      color: 'bg-purple-100 text-purple-600'
    },
    {
      title: 'Carbon Footprint',
      icon: <Battery className="h-6 w-6" />,
      description: 'Monitor your environmental impact',
      link: '/carbon-footprint',
      color: 'bg-yellow-100 text-yellow-600'
    },
    {
      title: 'Resource Finder',
      icon: <BookOpen className="h-6 w-6" />,
      description: 'Discover sustainable resources and tips',
      link: '/resources',
      color: 'bg-pink-100 text-pink-600'
    },
    {
      title: 'Profile',
      icon: <User className="h-6 w-6" />,
      description: 'Manage your account settings',
      link: '/profile',
      color: 'bg-indigo-100 text-indigo-600'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          Welcome back, {user?.displayName || profile?.displayName}!
        </h1>
        <p className="mt-2 text-gray-600">
          Continue your journey towards sustainable living.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {menuItems.map((item) => (
          <Link
            key={item.title}
            to={item.link}
            className="block p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200"
          >
            <div className={`inline-flex p-3 rounded-lg ${item.color}`}>
              {item.icon}
            </div>
            <h3 className="mt-4 text-lg font-medium text-gray-900">
              {item.title}
            </h3>
            <p className="mt-2 text-gray-600">
              {item.description}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}