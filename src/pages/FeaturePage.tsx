import React from 'react';
import { BookOpen, Users, Sparkles, Camera, Share2, Trophy } from 'lucide-react';

const FeaturesPage = () => {
  const features = [
    {
      icon: BookOpen,
      title: "Document Progress",
      description: "Chronicle your journey with photos, reflections, and milestones in your personal transformation diary."
    },
    {
      icon: Users,
      title: "Connect & Share",
      description: "Join a supportive community of individuals on similar paths and share experiences."
    },
    {
      icon: Sparkles,
      title: "Get Inspired",
      description: "Discover inspiring stories from others and gain insights for your own journey."
    },
    {
      icon: Camera,
      title: "Visual Timeline",
      description: "Create beautiful visual timelines of your transformation journey with our intuitive tools."
    },
    {
      icon: Share2,
      title: "Social Integration",
      description: "Share your progress across various social platforms with just one click."
    },
    {
      icon: Trophy,
      title: "Milestone Tracking",
      description: "Set and track personal goals, celebrating each achievement along the way."
    }
  ];

  return (
    <main className="pt-20">
      <section className="relative">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/10 via-purple-900/10 to-pink-900/10" />
        <div className="container mx-auto px-6 py-20">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-8 text-indigo-900">Our <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">Features</span></h1>
          
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <div key={index} className="bg-white/80 backdrop-blur-sm rounded-xl p-8 shadow-lg hover:shadow-xl transition">
                    <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-6">
                      <Icon className="h-6 w-6 text-indigo-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-indigo-900 mb-4">{feature.title}</h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-20 text-center">
            <button className="px-8 py-3 bg-indigo-600 text-white rounded-full font-semibold hover:bg-indigo-700 transition">
              Get Started Now
            </button>
          </div>
        </div>
      </section>
    </main>
  );
};

export default FeaturesPage;