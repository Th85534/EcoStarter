/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from 'react';
import { MessageSquare, ThumbsUp, Share2, Send, Image as ImageIcon, X } from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import { db } from '../lib/firebase';
import { collection, query, orderBy, getDocs, addDoc, updateDoc, doc, arrayUnion, arrayRemove, Timestamp, deleteDoc } from 'firebase/firestore';
import { uploadImage } from '../lib/cloudinary';

interface Comment {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  content: string;
  timestamp: Date;
}

interface Post {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  content: string;
  image?: string;
  likes: string[];
  comments: Comment[];
  timestamp: Date;
}

export default function CommunitySpace() {
  const { user } = useAuthStore();
  const [posts, setPosts] = useState<Post[]>([]);
  const [newPost, setNewPost] = useState('');
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [commentContent, setCommentContent] = useState<{ [key: string]: string }>({});
  const [showComments, setShowComments] = useState<{ [key: string]: boolean }>({});

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    try {
      const q = query(collection(db, 'posts'), orderBy('timestamp', 'desc'));
      const querySnapshot = await getDocs(q);
      const loadedPosts: Post[] = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        loadedPosts.push({
          id: doc.id,
          ...data,
          timestamp: data.timestamp.toDate(),
          comments: data.comments?.map((comment: any) => ({
            ...comment,
            timestamp: comment.timestamp.toDate()
          })) || []
        } as Post);
      });
      setPosts(loadedPosts);
    } catch (error) {
      console.error('Error loading posts:', error);
    }
  };

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || (!newPost.trim() && !selectedImage)) return;

    setLoading(true);
    try {
      let imageUrl = '';
      if (selectedImage) {
        imageUrl = await uploadImage(selectedImage);
      }

      const postData = {
        userId: user.uid,
        userName: user?.displayName || 'Anonymous',
        userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=' + user.uid,
        content: newPost,
        image: imageUrl,
        likes: [],
        comments: [],
        timestamp: Timestamp.now()
      };

      const docRef = await addDoc(collection(db, 'posts'), postData);
      const newPostWithId = { id: docRef.id, ...postData, timestamp: new Date() };
      setPosts([newPostWithId, ...posts]);
      setNewPost('');
      setSelectedImage(null);
      setImagePreview(null);
    } catch (error) {
      console.error('Error creating post:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLike = async (postId: string) => {
    if (!user) return;

    try {
      const postRef = doc(db, 'posts', postId);
      const post = posts.find(p => p.id === postId);
      if (!post) return;

      const isLiked = post.likes.includes(user.uid);
      await updateDoc(postRef, {
        likes: isLiked ? arrayRemove(user.uid) : arrayUnion(user.uid)
      });

      setPosts(posts.map(post => {
        if (post.id === postId) {
          return {
            ...post,
            likes: isLiked
              ? post.likes.filter(id => id !== user.uid)
              : [...post.likes, user.uid]
          };
        }
        return post;
      }));
    } catch (error) {
      console.error('Error updating like:', error);
    }
  };

  const handleComment = async (postId: string) => {
    if (!user || !commentContent[postId]?.trim()) return;

    try {
      const postRef = doc(db, 'posts', postId);
      const newComment = {
        id: crypto.randomUUID(),
        userId: user.uid,
        userName: user.email?.split('@')[0] || 'Anonymous',
        userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=' + user.uid,
        content: commentContent[postId],
        timestamp: Timestamp.now()
      };

      await updateDoc(postRef, {
        comments: arrayUnion(newComment)
      });

      setPosts(posts.map(post => {
        if (post.id === postId) {
          return {
            ...post,
            comments: [...post.comments, { ...newComment, timestamp: new Date() }]
          };
        }
        return post;
      }));

      setCommentContent({ ...commentContent, [postId]: '' });
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  const deletePost = async (postId: string) => {
    if (!user) return;

    try {
      const post = posts.find(p => p.id === postId);
      if (!post || post.userId !== user.uid) return;

      await deleteDoc(doc(db, 'posts', postId));
      setPosts(posts.filter(p => p.id !== postId));
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Community Space</h1>
        <p className="mt-2 text-gray-600">Connect with fellow eco-warriors and share your journey</p>
      </div>
      
      {/* Create Post */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
        <form onSubmit={handleSubmit}>
          <textarea
            placeholder="Share your eco-friendly journey..."
            value={newPost}
            onChange={(e) => setNewPost(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500"
            rows={3}
          />
          {imagePreview && (
            <div className="mt-2 relative">
              <img
                src={imagePreview}
                alt="Selected"
                className="w-full h-48 object-cover rounded-lg"
              />
              <button
                type="button"
                title='Remove image'
                onClick={() => {
                  setSelectedImage(null);
                  setImagePreview(null);
                }}
                className="absolute top-2 right-2 p-1 bg-gray-900 bg-opacity-50 rounded-full text-white hover:bg-opacity-70"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          )}
          <div className="mt-3 flex justify-between items-center">
            <label className="cursor-pointer">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageSelect}
                className="hidden"
              />
              <div className="inline-flex items-center text-gray-700 hover:text-green-600">
                <ImageIcon className="h-5 w-5 mr-2" />
                Add Photo
              </div>
            </label>
            <button
              type="submit"
              disabled={loading || (!newPost.trim() && !selectedImage)}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="h-4 w-4 mr-2" />
              {loading ? 'Posting...' : 'Post'}
            </button>
          </div>
        </form>
      </div>

      {/* Posts Feed */}
      <div className="space-y-6">
        {posts.map((post) => (
          <div key={post.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <img
                  src={post.userAvatar}
                  alt={post.userName}
                  className="h-10 w-10 rounded-full"
                />
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900">{post.userName}</p>
                  <p className="text-sm text-gray-500">
                    {post.timestamp.toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </p>
                </div>
              </div>
              {user && post.userId === user.uid && (
                <button
                  type='button'
                  title='Delete post'
                  onClick={() => deletePost(post.id)}
                  className="text-gray-400 hover:text-red-500"
                >
                  <X className="h-5 w-5" />
                </button>
              )}
            </div>
            <p className="mt-4 text-gray-900">{post.content}</p>
            {post.image && (
              <img
                src={post.image}
                alt="Post content"
                className="mt-4 w-full h-64 object-cover rounded-lg"
              />
            )}
            <div className="mt-4 flex items-center space-x-4">
              <button
                onClick={() => handleLike(post.id)}
                className={`flex items-center space-x-1 text-sm ${
                  user && post.likes.includes(user.uid) ? 'text-green-600' : 'text-gray-500'
                } hover:text-green-600`}
              >
                <ThumbsUp className="h-5 w-5" />
                <span>{post.likes.length}</span>
              </button>
              <button
                onClick={() => setShowComments({ ...showComments, [post.id]: !showComments[post.id] })}
                className="flex items-center space-x-1 text-sm text-gray-500 hover:text-green-600"
              >
                <MessageSquare className="h-5 w-5" />
                <span>{post.comments.length}</span>
              </button>
              <button className="flex items-center space-x-1 text-sm text-gray-500 hover:text-green-600">
                <Share2 className="h-5 w-5" />
                <span>Share</span>
              </button>
            </div>

            {showComments[post.id] && (
              <div className="mt-4 space-y-4">
                {post.comments.map((comment) => (
                  <div key={comment.id} className="flex space-x-3 pl-6 border-l-2 border-gray-100">
                    <img
                      src={comment.userAvatar}
                      alt={comment.userName}
                      className="h-8 w-8 rounded-full"
                    />
                    <div>
                      <div className="text-sm">
                        <span className="font-medium text-gray-900">{comment.userName}</span>
                      </div>
                      <p className="mt-1 text-sm text-gray-700">{comment.content}</p>
                      <p className="mt-1 text-xs text-gray-500">
                        {comment.timestamp.toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </p>
                    </div>
                  </div>
                ))}
                {user && (
                  <div className="flex items-start space-x-3 mt-4">
                    <img
                      src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.uid}`}
                      alt="Your avatar"
                      className="h-8 w-8 rounded-full"
                    />
                    <div className="flex-1">
                      <input
                        type="text"
                        value={commentContent[post.id] || ''}
                        onChange={(e) => setCommentContent({
                          ...commentContent,
                          [post.id]: e.target.value
                        })}
                        placeholder="Write a comment..."
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                      />
                      <button
                        type="button"
                        onClick={() => handleComment(post.id)}
                        disabled={!commentContent[post.id]?.trim()}
                        className="mt-2 px-3 py-1 text-sm text-white bg-green-600 rounded-md hover:bg-green-700 disabled:opacity-50"
                      >
                        Comment
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}