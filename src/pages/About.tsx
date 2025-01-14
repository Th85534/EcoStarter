import React from 'react';

const About = () => {
  return (
    <main className="pt-20">
      <section className="relative">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/10 via-purple-900/10 to-pink-900/10" />
        <div className="container mx-auto px-6 py-20">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-8 text-indigo-900">About <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">Metamorph</span></h1>
          <div className="max-w-3xl mx-auto bg-white/80 backdrop-blur-sm rounded-xl p-8 shadow-lg">
            <p className="text-gray-700 text-lg mb-6 leading-relaxed">
              Metamorph is more than just a platform – it's a community dedicated to personal growth and transformation. We believe that every journey of change deserves to be documented, shared, and celebrated.
            </p>
            <p className="text-gray-700 text-lg mb-6 leading-relaxed">
              Founded in 2024, our mission is to provide a space where individuals can chronicle their evolution, connect with like-minded people, and inspire others through their stories of change.
            </p>
            <div className="grid md:grid-cols-3 gap-8 mt-12">
              <div className="text-center">
                <h3 className="text-2xl font-bold text-indigo-600 mb-2">1000+</h3>
                <p className="text-gray-600">Active Users</p>
              </div>
              <div className="text-center">
                <h3 className="text-2xl font-bold text-indigo-600 mb-2">500+</h3>
                <p className="text-gray-600">Success Stories</p>
              </div>
              <div className="text-center">
                <h3 className="text-2xl font-bold text-indigo-600 mb-2">50+</h3>
                <p className="text-gray-600">Countries</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default About;