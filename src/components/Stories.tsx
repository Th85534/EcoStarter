import React from 'react'

// type StoryProps = {}

const Stories = () => {
  return (
    <section className="py-20 bg-indigo-50">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold text-center mb-12">Featured Transformation Stories</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  title: "Art Journey: Finding My Style",
                  image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=800&q=80",
                  author: "Sarah Chen",
                  category: "Creative Growth"
                },
                {
                  title: "From Corporate to Creative",
                  image: "https://images.unsplash.com/photo-1513519245088-0e12902e35a6?auto=format&fit=crop&w=800&q=80",
                  author: "Michael Torres",
                  category: "Career Change"
                },
                {
                  title: "My Fitness Revolution",
                  image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=800&q=80",
                  author: "Emma Wright",
                  category: "Health & Wellness"
                }
              ].map((story, index) => (
                <div key={index} className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition">
                  <img src={story.image} alt={story.title} className="w-full h-48 object-cover" />
                  <div className="p-6">
                    <span className="text-sm text-indigo-600 font-semibold">{story.category}</span>
                    <h3 className="text-xl font-semibold mt-2 mb-2">{story.title}</h3>
                    <p className="text-gray-600 text-sm">By {story.author}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
  )
}

export default Stories