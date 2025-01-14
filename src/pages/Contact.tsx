import React from 'react';
import { Mail, MapPin, Phone } from 'lucide-react';

const Contact = () => {
  return (
    <main className="pt-20">
      <section className="relative">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/10 via-purple-900/10 to-pink-900/10" />
        <div className="container mx-auto px-6 py-20">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-8 text-indigo-900">Get in <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">Touch</span></h1>
          
          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-8 shadow-lg">
              <form>
                <div className="mb-6">
                  <label className="block text-gray-700 text-sm font-semibold mb-2">Name</label>
                  <input type="text" className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent" />
                </div>
                <div className="mb-6">
                  <label className="block text-gray-700 text-sm font-semibold mb-2">Email</label>
                  <input type="email" className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent" />
                </div>
                <div className="mb-6">
                  <label className="block text-gray-700 text-sm font-semibold mb-2">Message</label>
                  <textarea rows={4} className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"></textarea>
                </div>
                <button className="w-full px-6 py-3 bg-indigo-600 text-white rounded-full font-semibold hover:bg-indigo-700 transition">
                  Send Message
                </button>
              </form>
            </div>
            
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-8 shadow-lg">
              <h2 className="text-2xl font-bold text-indigo-900 mb-6">Contact Information</h2>
              <div className="space-y-6">
                <div className="flex items-center">
                  <Mail className="h-6 w-6 text-indigo-600 mr-4" />
                  <span className="text-gray-600">hello@metamorph.com</span>
                </div>
                <div className="flex items-center">
                  <Phone className="h-6 w-6 text-indigo-600 mr-4" />
                  <span className="text-gray-600">+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="h-6 w-6 text-indigo-600 mr-4" />
                  <span className="text-gray-600">123 Transformation St, Digital City</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Contact;