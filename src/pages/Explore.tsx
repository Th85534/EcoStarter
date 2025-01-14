import React, { useState, useEffect } from 'react';
import { Heart, MessageCircle, Share2 } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { db } from '../lib/firebase';
import { 
  collection, 
  query, 
  orderBy, 
  onSnapshot,
  doc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  where,
  getDocs,
  Timestamp
} from 'firebase/firestore';
import toast from 'react-hot-toast';
import CommentModal from '../components/CommentModal';

interface Journey {
  id: string;
  userId: string;
  userEmail: string;
  title: string;
  description: string;
  image: string;
  category: string;
  likes: string[];
  commentsCount: number;
  createdAt: Timestamp;
}

export default function Explore() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [journeys, setJourneys] = useState<Journey[]>([]);
  const [selectedJourneyId, setSelectedJourneyId] = useState<string | null>(null);
  const { currentUser } = useAuth();

  useEffect(() => {
    const q = query(collection(db, 'journeys'), orderBy('createdAt', 'desc'));
    
    const unsubscribe = onSnapshot(q, async (snapshot) => {
      const journeysList = await Promise.all(
        snapshot.docs.map(async (doc) => {
          const data = doc.data();
          const commentsQuery = query(
            collection(db, 'comments'),
            where('journeyId', '==', doc.id)
          );
          const commentsSnapshot = await getDocs(commentsQuery);
          
          return {
            id: doc.id,
            ...data,
            commentsCount: commentsSnapshot.size
          } as Journey;
        })
      );
      setJourneys(journeysList);
    });

    return () => unsubscribe();
  }, []);

  const handleLike = async (journeyId: string) => {
    if (!currentUser) {
      toast.error('Please sign in to like posts');
      return;
    }

    const journeyRef = doc(db, 'journeys', journeyId);
    const journey = journeys.find(j => j.id === journeyId);
    
    if (!journey) return;

    try {
      if (journey.likes.includes(currentUser.uid)) {
        await updateDoc(journeyRef, {
          likes: arrayRemove(currentUser.uid)
        });
      } else {
        await updateDoc(journeyRef, {
          likes: arrayUnion(currentUser.uid)
        });
      }
    } catch (error) {
      toast.error('Failed to update like');
      console.error(error);
    }
  };
  console.log(window.location.href)
  const handleShare = async (journey: Journey) => {
    try {
      await navigator.share({
        title: journey.title,
        text: journey.description,
        url: window.location.href
      });
    } catch (error) {
      toast.error('Sharing failed');
      console.error(error);
    }
  };

  const filters = ['all', 'Personal Growth', 'Artistic Transformation', 'Fitness Journey', 'Skill Development'];

  return (
    <main className="pt-20">
      <div className="container mx-auto px-4 py-8">
        {/* Filters */}
        <div className="mb-8 overflow-x-auto">
          <div className="flex space-x-4">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-4 py-2 rounded-full whitespace-nowrap ${
                  activeFilter === filter
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {filter.charAt(0).toUpperCase() + filter.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Journey Feed */}
        <div className="space-y-6">
          {journeys
            .filter(journey => activeFilter === 'all' || journey.category === activeFilter)
            .map((journey) => (
              <div key={journey.id} className="bg-white rounded-xl shadow-lg overflow-hidden">
                {/* User Info */}
                <div className="p-4 flex items-center space-x-3">
                  <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center">
                    <span className="text-xl font-bold text-indigo-600">
                      {journey.userEmail[0].toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <h4 className="font-semibold">{journey.userEmail}</h4>
                    <p className="text-sm text-gray-500">
                      {journey.createdAt?.toDate().toLocaleDateString()}
                    </p>
                  </div>
                </div>

                {/* Journey Content */}
                <img
                  src={journey.image}
                  alt={journey.title}
                  className="w-full h-96 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{journey.title}</h3>
                  <p className="text-gray-600 mb-4">{journey.description}</p>
                  
                  {/* Interaction Buttons */}
                  <div className="flex items-center justify-between">
                    <div className="flex space-x-6">
                      <button 
                        onClick={() => handleLike(journey.id)}
                        className={`flex items-center space-x-2 ${
                          currentUser && journey.likes.includes(currentUser.uid)
                            ? 'text-red-500'
                            : 'text-gray-600 hover:text-red-500'
                        }`}
                      >
                        <Heart className="h-6 w-6" fill={currentUser && journey.likes.includes(currentUser.uid) ? 'currentColor' : 'none'} />
                        <span>{journey.likes.length}</span>
                      </button>
                      <button 
                        onClick={() => setSelectedJourneyId(journey.id)}
                        className="flex items-center space-x-2 text-gray-600 hover:text-indigo-500"
                      >
                        <MessageCircle className="h-6 w-6" />
                        <span>{journey.commentsCount}</span>
                      </button>
                    </div>
                    <button 
                      onClick={() => handleShare(journey)}
                      className="text-gray-600 hover:text-indigo-500"
                    >
                      <Share2 className="h-6 w-6" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>

      <CommentModal
        isOpen={!!selectedJourneyId}
        onClose={() => setSelectedJourneyId(null)}
        journeyId={selectedJourneyId || ''}
      />
    </main>
  );
}