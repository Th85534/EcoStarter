import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { db } from '../lib/firebase';
import { collection, addDoc, query, where, onSnapshot, Timestamp } from 'firebase/firestore';
import toast from 'react-hot-toast';

interface CommentModalProps {
  isOpen: boolean;
  onClose: () => void;
  journeyId: string;
}

interface Comment {
  id: string;
  text: string;
  userId: string;
  userEmail: string;
  createdAt: Timestamp;
}

export default function CommentModal({ isOpen, onClose, journeyId }: CommentModalProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { currentUser } = useAuth();

  useEffect(() => {
    if (!isOpen || !journeyId) return;

    const q = query(
      collection(db, 'comments'),
      where('journeyId', '==', journeyId)
    );

    setLoading(true);
    setError(null);

    const unsubscribe = onSnapshot(q, 
      (snapshot) => {
        const commentsList = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        } as Comment));
        
        // Sort comments by createdAt in memory
        const sortedComments = commentsList.sort((a, b) => 
          b.createdAt.toMillis() - a.createdAt.toMillis()
        );
        
        setComments(sortedComments);
        setLoading(false);
      },
      (err) => {
        console.error('Error fetching comments:', err);
        setError('Failed to load comments. Please try again later.');
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [journeyId, isOpen]);

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) {
      toast.error('Please sign in to comment');
      return;
    }

    if (!newComment.trim()) return;

    try {
      await addDoc(collection(db, 'comments'), {
        journeyId,
        text: newComment.trim(),
        userId: currentUser.uid,
        userEmail: currentUser.email,
        createdAt: Timestamp.now()
      });
      setNewComment('');
      toast.success('Comment added successfully');
    } catch (error) {
      toast.error('Failed to add comment');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 max-w-lg w-full max-h-[80vh] flex flex-col relative">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
        >
          <X className="h-6 w-6" />
        </button>

        <h2 className="text-2xl font-bold mb-6">Comments</h2>

        <div className="flex-1 overflow-y-auto mb-4">
          {loading ? (
            <div className="flex justify-center items-center h-32">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
            </div>
          ) : error ? (
            <p className="text-red-500 text-center">{error}</p>
          ) : comments.length === 0 ? (
            <p className="text-gray-500 text-center">No comments yet</p>
          ) : (
            <div className="space-y-4">
              {comments.map((comment) => (
                <div key={comment.id} className="bg-gray-50 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <span className="font-semibold">{comment.userEmail}</span>
                    <span className="text-sm text-gray-500">
                      {comment.createdAt.toDate().toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-gray-700">{comment.text}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        <form onSubmit={handleSubmitComment} className="flex gap-2">
          <input
            type="text"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Write a comment..."
            className="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
          >
            Post
          </button>
        </form>
      </div>
    </div>
  );
}