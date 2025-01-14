import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { JourneyCategory } from '../../types/journey';
import { PlusCircle, Upload, Sparkles } from 'lucide-react';
import toast from 'react-hot-toast';
import { db } from '../../lib/firebase';
import { collection, addDoc } from 'firebase/firestore';
import { uploadImage } from '../../lib/cloudinary';

// ... (keep existing category and aiSuggestions code)

export default function CreateJourney({setCurrentPage}: Props) {
  const { currentUser } = useAuth();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<JourneyCategory>('Personal Growth');
  const [milestones, setMilestones] = useState<string[]>([]);
  const [newMilestone, setNewMilestone] = useState('');
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) {
      toast.error('Please sign in to create a journey');
      return;
    }

    setLoading(true);

    try {
      let imageUrl = 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=800&q=80';
      
      if (selectedImage) {
        const uploadedUrl = await uploadImage(selectedImage);
        if (uploadedUrl) {
          imageUrl = uploadedUrl;
        }
      }

      const journeyData = {
        title,
        description,
        category,
        milestones,
        userId: currentUser.uid,
        userEmail: currentUser.email,
        createdAt: new Date(),
        likes: [],
        image: imageUrl,
        isPublic: true
      };

      await addDoc(collection(db, 'journeys'), journeyData);
      
      toast.success('Journey created successfully!');
      setCurrentPage('dashboard');
    } catch (error) {
      toast.error('Failed to create journey');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // ... (keep existing milestone handling code)

  return (
    <div className="container mx-auto px-6 py-8">
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-3xl font-bold text-indigo-900 mb-6">Create Your Journey</h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* ... (keep existing title, category, description inputs) ... */}

          <div>
            <label className="block text-gray-700 font-semibold mb-2">Cover Image</label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
              {imagePreview ? (
                <div className="relative">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="max-h-48 mx-auto rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedImage(null);
                      setImagePreview(null);
                    }}
                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                  >
                    ×
                  </button>
                </div>
              ) : (
                <>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                    id="cover-image"
                  />
                  <label
                    htmlFor="cover-image"
                    className="flex flex-col items-center gap-2 cursor-pointer"
                  >
                    <Upload className="h-8 w-8 text-gray-400" />
                    <span className="text-gray-600">Click to upload a cover image</span>
                  </label>
                </>
              )}
            </div>
          </div>

          {/* ... (keep existing milestones section) ... */}

          <button
            type="submit"
            disabled={loading}
            className="w-full px-6 py-3 bg-indigo-600 text-white rounded-full font-semibold hover:bg-indigo-700 transition disabled:opacity-50"
          >
            {loading ? 'Creating...' : 'Create Journey'}
          </button>
        </form>
      </div>
    </div>
  );
}