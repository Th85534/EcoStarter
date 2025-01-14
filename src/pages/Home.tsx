import React from 'react'
import Hero from '../components/Hero';
import Features from '../components/Features';
import Stories from '../components/Stories';

// interface Props {

// }

function Home() {
  return (
    <main>
        <Hero />    
        <Features />
        <Stories />
        {/* CTA Section */}
        <section className="py-20">
          <div className="container mx-auto px-6">
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-12 text-center text-white">
              <h2 className="text-3xl font-bold mb-6">Ready to Start Your Journey?</h2>
              <p className="text-xl mb-8 max-w-2xl mx-auto">
                Join thousands of others who are documenting their transformation stories and inspiring the world.
              </p>
              <button className="px-8 py-3 bg-white text-indigo-600 rounded-full font-semibold hover:bg-indigo-50 transition">
                Create Your Story
              </button>
            </div>
          </div>
        </section>
    </main>
  )
}

export default Home