import React, { useState, useEffect } from 'react';
import { Trophy, CheckCircle2, Circle, Plus, Trash2, Edit2 } from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import { db } from '../lib/firebase';
import { collection, query, where, getDocs, addDoc, deleteDoc, doc, updateDoc } from 'firebase/firestore';

interface Challenge {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  difficulty: 'easy' | 'medium' | 'hard';
  impact: string;
  dueDate?: string;
  userId: string;
}

export default function PersonalChallenges() {
  const { user } = useAuthStore();
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingChallenge, setEditingChallenge] = useState<Challenge | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    difficulty: 'medium' as 'easy' | 'medium' | 'hard',
    impact: '',
    dueDate: ''
  });

  useEffect(() => {
    if (user) {
      loadChallenges();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const loadChallenges = async () => {
    if (!user) return;

    try {
      const q = query(
        collection(db, 'challenges'),
        where('userId', '==', user.uid)
      );
      const querySnapshot = await getDocs(q);
      const loadedChallenges: Challenge[] = [];
      querySnapshot.forEach((doc) => {
        loadedChallenges.push({ id: doc.id, ...doc.data() } as Challenge);
      });
      setChallenges(loadedChallenges);
    } catch (error) {
      console.error('Error loading challenges:', error);
    }
  };

  const toggleComplete = async (id: string) => {
    try {
      const challenge = challenges.find(c => c.id === id);
      if (!challenge) return;

      const challengeRef = doc(db, 'challenges', id);
      await updateDoc(challengeRef, {
        completed: !challenge.completed
      });

      setChallenges(challenges.map(challenge =>
        challenge.id === id ? { ...challenge, completed: !challenge.completed } : challenge
      ));
    } catch (error) {
      console.error('Error updating challenge:', error);
    }
  };

  const deleteChallenge = async (id: string) => {
    try {
      await deleteDoc(doc(db, 'challenges', id));
      setChallenges(challenges.filter(challenge => challenge.id !== id));
    } catch (error) {
      console.error('Error deleting challenge:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    try {
      const challengeData = {
        ...formData,
        completed: false,
        userId: user.uid
      };

      if (editingChallenge) {
        const challengeRef = doc(db, 'challenges', editingChallenge.id);
        await updateDoc(challengeRef, challengeData);
        setChallenges(challenges.map(challenge =>
          challenge.id === editingChallenge.id ? { ...challenge, ...challengeData } : challenge
        ));
      } else {
        const docRef = await addDoc(collection(db, 'challenges'), challengeData);
        setChallenges([...challenges, { id: docRef.id, ...challengeData }]);
      }

      setShowForm(false);
      setEditingChallenge(null);
      setFormData({
        title: '',
        description: '',
        difficulty: 'medium',
        impact: '',
        dueDate: ''
      });
    } catch (error) {
      console.error('Error saving challenge:', error);
    }
  };

  const startEdit = (challenge: Challenge) => {
    setEditingChallenge(challenge);
    setFormData({
      title: challenge.title,
      description: challenge.description,
      difficulty: challenge.difficulty,
      impact: challenge.impact,
      dueDate: challenge.dueDate || ''
    });
    setShowForm(true);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'text-green-500';
      case 'medium': return 'text-yellow-500';
      case 'hard': return 'text-red-500';
      default: return 'text-gray-500';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
      <div className="mb-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Personal Challenges</h1>
            <p className="mt-2 text-gray-600">Track your progress towards a sustainable lifestyle</p>
          </div>
          <button
            onClick={() => setShowForm(true)}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700"
          >
            <Plus className="h-5 w-5 mr-2" />
            Add Challenge
          </button>
        </div>

        <div className="mt-4 bg-white bg-opacity-60 shadow-md rounded-lg p-4">
          <div className="flex items-center">
            <Trophy className="h-8 w-8 text-green-600 mr-3" />
            <div>
              <h2 className="text-lg font-semibold text-green-800">
                Your Progress
              </h2>
              <p className="text-green-600">
                {challenges.filter(c => c.completed).length} of {challenges.length} challenges completed
              </p>
            </div>
          </div>
        </div>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              {editingChallenge ? 'Edit Challenge' : 'Add New Challenge'}
            </h3>
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div>
                  <label htmlFor='title' className="block text-sm font-medium text-gray-700">Title</label>
                  <input
                    id='title'
                    type="text"
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                    value={formData.title}
                    onChange={e => setFormData({ ...formData, title: e.target.value })}
                  />
                </div>
                <div>
                  <label htmlFor='description' className="block text-sm font-medium text-gray-700">Description</label>
                  <textarea
                  id='description'
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                    rows={3}
                    value={formData.description}
                    onChange={e => setFormData({ ...formData, description: e.target.value })}
                  />
                </div>
                <div>
                  <label htmlFor="difficulty" className="block text-sm font-medium text-gray-700">Difficulty</label>
                  <select
                    id="difficulty"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                    value={formData.difficulty}
                    onChange={e => setFormData({ ...formData, difficulty: e.target.value as 'easy' | 'medium' | 'hard' })}
                  >
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Environmental Impact</label>
                  <input
                    type="text"
                    required
                    placeholder="Enter environmental impact"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                    value={formData.impact}
                    onChange={e => setFormData({ ...formData, impact: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Due Date (Optional)</label>
                  <input
                    type="date"
                    placeholder="Select due date"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                    value={formData.dueDate}
                    onChange={e => setFormData({ ...formData, dueDate: e.target.value })}
                  />
                </div>
              </div>
              <div className="mt-5 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    setEditingChallenge(null);
                    setFormData({
                      title: '',
                      description: '',
                      difficulty: 'medium',
                      impact: '',
                      dueDate: ''
                    });
                  }}
                  className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 border border-gray-300 rounded-md"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-medium text-white bg-green-600 hover:bg-green-700 rounded-md"
                >
                  {editingChallenge ? 'Save Changes' : 'Add Challenge'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="space-y-4">
        {challenges.map((challenge) => (
          <div
            key={challenge.id}
            className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-4">
                <button
                  onClick={() => toggleComplete(challenge.id)}
                  className="mt-1"
                >
                  {challenge.completed ? (
                    <CheckCircle2 className="h-6 w-6 text-green-500" />
                  ) : (
                    <Circle className="h-6 w-6 text-gray-300" />
                  )}
                </button>
                <div>
                  <h3 className={`text-lg font-medium ${challenge.completed ? 'text-gray-500 line-through' : 'text-gray-900'}`}>
                    {challenge.title}
                  </h3>
                  <p className={`mt-1 text-gray-600 ${challenge.completed ? 'line-through' : ''}`}>
                    {challenge.description}
                  </p>
                  <div className="mt-2 flex items-center space-x-4">
                    <span className={`text-sm ${getDifficultyColor(challenge.difficulty)}`}>
                      {challenge.difficulty.charAt(0).toUpperCase() + challenge.difficulty.slice(1)}
                    </span>
                    {challenge.dueDate && (
                      <span className="text-sm text-gray-500">
                        Due: {new Date(challenge.dueDate).toLocaleDateString()}
                      </span>
                    )}
                  </div>
                  <p className="mt-2 text-sm text-gray-500">
                    <strong>Impact:</strong> {challenge.impact}
                  </p>
                </div>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => startEdit(challenge)}
                  className="text-gray-400 hover:text-blue-500"
                  title="Edit Challenge"
                >
                  <Edit2 className="h-5 w-5" />
                </button>
                <button
                  onClick={() => deleteChallenge(challenge.id)}
                  className="text-gray-400 hover:text-red-500"
                  title="Delete Challenge"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}