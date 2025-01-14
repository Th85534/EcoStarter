import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserStore } from '../store/userStore';
import { uploadImage } from '../lib/cloudinary';
import { Camera, User } from 'lucide-react';

export default function EditProfile() {
  const { profile, updateProfile, fetchProfile, loading } = useUserStore();
  const navigate = useNavigate();
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState({
    displayName: '',
    bio: '',
    location: '',
    interests: [] as string[],
    profileImage: '',
    coverImage: ''
  });

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  useEffect(() => {
    if (profile) {
      setFormData({
        displayName: profile.displayName || '',
        bio: profile.bio || '',
        location: profile.location || '',
        interests: profile.interests || [],
        profileImage: profile.profileImage || '',
        coverImage: profile.coverImage || ''
      });
    }
  }, [profile]);

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>, type: 'profile' | 'cover') => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      setUploading(true);
      const imageUrl = await uploadImage(file);
      setFormData(prev => ({
        ...prev,
        [type === 'profile' ? 'profileImage' : 'coverImage']: imageUrl
      }));
    } catch (error) {
      console.error('Error uploading image:', error);
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateProfile(formData);
    navigate('/profile');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="relative">
          <div className="h-32 bg-green-600">
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleImageUpload(e, 'cover')}
              className="hidden"
              id="cover-upload"
              title="Upload cover image"
            />
            <label
              htmlFor="cover-upload"
              className="absolute right-4 top-4 p-2 bg-white rounded-full cursor-pointer"
            >
              <Camera className="h-5 w-5 text-gray-600" />
            </label>
            {formData.coverImage && (
              <img
                src={formData.coverImage}
                alt="Cover"
                className="w-full h-32 object-cover"
              />
            )}
          </div>
          <div className="absolute left-6 -bottom-16">
            <div className="relative">
              <div className="w-32 h-32 rounded-full bg-white p-2 shadow-lg">
                {formData.profileImage ? (
                  <img
                    src={formData.profileImage}
                    alt="Profile"
                    className="w-full h-full rounded-full object-cover"
                  />
                ) : (
                  <User className="w-full h-full text-green-600" />
                )}
              </div>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleImageUpload(e, 'profile')}
                className="hidden"
                id="profile-upload"
                title="Upload profile image"
                placeholder="Upload profile image"
              />
              <label
                htmlFor="profile-upload"
                className="absolute bottom-0 right-0 p-2 bg-white rounded-full shadow cursor-pointer"
              >
                <Camera className="h-5 w-5 text-gray-600" />
              </label>
            </div>
          </div>
        </div>

        <div className="px-6 pt-20 pb-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Display Name</label>
              <input
                type="text"
                value={formData.displayName}
                onChange={(e) => setFormData({ ...formData, displayName: e.target.value })}
                className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                title='Display Name'
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Bio</label>
              <textarea
                value={formData.bio}
                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                rows={4}
                className="mt-1 block w-full h-14 rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                title='Bio'
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Location</label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                title='Location'
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Interests</label>
              <input
                type="text"
                value={formData.interests.join(', ')}
                onChange={(e) => setFormData({
                  ...formData,
                  interests: e.target.value.split(',').map(i => i.trim()).filter(Boolean)
                })}
                placeholder="Separate interests with commas"
                className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
              />
            </div>

            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => navigate('/profile')}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading || uploading}
                className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700 disabled:opacity-50"
              >
                {loading || uploading ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}