import { useEffect } from 'react';
import { User, Settings, LogOut } from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import { useUserStore } from '../store/userStore';
import { useNavigate } from 'react-router-dom';

export default function UserProfile() {
  const { user, logout } = useAuthStore();
  const { profile, fetchProfile } = useUserStore();
  const navigate = useNavigate();

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  const handleEdit = () => {
    navigate('/profile/edit')
  }

  const handleLogout = async () => {
    await logout();
    navigate('/home');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-36">
      <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
        <div className="relative z-10">
          {profile?.coverImage ? (
            <img 
              src={profile.coverImage} 
              alt="Cover" 
              className="w-full h-40 object-cover"
            />
          ) : (
            <div className="bg-green-600 h-40"></div>
          )}
        </div>
        <div className="px-6 py-8">
          <div className="relative flex flex-col sm:flex-row items-center sm:items-start z-20">
            <div className="-mt-14 sm:-mt-22 mb-4 sm:mb-0">
              <div className="rounded-full bg-white p-2 shadow-lg">
                {profile?.profileImage ? (
                  <img 
                    src={profile.profileImage} 
                    alt="Profile" 
                    className="h-20 w-20 rounded-full object-cover"
                  />
                ) : (
                  <User className="h-20 w-20 text-green-600" />
                )}
              </div>
            </div>
            <div className="sm:ml-6 text-center sm:text-left flex-1">
              <div className="flex flex-col sm:flex-row items-center justify-between">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">
                    {user?.displayName || profile?.displayName}
                  </h1>
                  <p className="text-gray-500">{user?.email}</p>
                </div>
                <div className="mt-4 sm:mt-0 space-x-3">
                  <button
                    onClick={handleEdit}
                    className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                  >
                    <Settings className="h-4 w-4 mr-2" />
                    Edit Profile
                  </button>
                  <button
                    onClick={handleLogout}
                    className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </button>
                </div>
              </div>
              <p className="mt-4 text-gray-600">{profile?.bio}</p>
              <div className="mt-4 flex items-center justify-center sm:justify-start text-gray-500">
                <span>{profile?.location}</span>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <h2 className="text-lg font-semibold text-gray-900">Interests</h2>
            <div className="mt-2 flex flex-wrap gap-2">
              {profile?.interests?.map((interest, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800"
                >
                  {interest}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}