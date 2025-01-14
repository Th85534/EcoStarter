import { useState } from 'react';
import { Search, Link as LinkIcon, ExternalLink } from 'lucide-react';

interface Resource {
  id: string;
  title: string;
  description: string;
  category: string;
  link: string;
  image: string;
}

export default function ResourceFinder() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    'all',
    'zero-waste',
    'renewable-energy',
    'sustainable-living',
    'gardening',
    'recycling'
  ];

  const resources: Resource[] = [
    {
      id: '1',
      title: 'Zero Waste Beginner\'s Guide',
      description: 'Comprehensive guide to starting your zero-waste journey with practical tips and strategies.',
      category: 'zero-waste',
      link: 'https://learn.eartheasy.com/guides/zero-waste-a-beginners-guide/',
      image: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=800'
    },
    {
      id: '2',
      title: 'Home Energy Efficiency Tips',
      description: 'Learn how to reduce your energy consumption and make your home more sustainable.',
      category: 'renewable-energy',
      link: 'https://www.energysage.com/energy-efficiency/ways-to-save-energy/',
      image: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=800'
    },
    {
      id: '3',
      title: 'Sustainable Living Tips',
      description: 'Practical advice for living a more sustainable and eco-friendly lifestyle.',
      category: 'sustainable-living',
      link: 'https://www.sustainablejungle.com/sustainable-living/sustainable-living-tips/',
      image: 'https://images.unsplash.com/photo-1489171078254-c3365d6e359f?q=80&w=1931&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    },
    {
      id: '4',
      title: 'Gardening for Beginners',
      description: 'A beginner\'s guide to starting your own garden and growing your own food.',
      category: 'gardening',
      link: 'https://www.thespruce.com/gardening-for-beginners-1403372',
      image: 'https://images.unsplash.com/photo-1523301343968-6a6ebf63c672?auto=format&fit=crop&w=800'
    },
    {
      id: '5',
      title: 'Recycling Basics',
      description: 'Learn the basics of recycling and how to properly sort your waste.',
      category: 'recycling',
      link: 'https://www.epa.gov/recycle/recycling-basics',
      image: 'https://images.unsplash.com/photo-1620429405088-b41981579f19?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    }
  ];

  const filteredResources = resources.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || resource.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Resource Finder</h1>
        <p className="mt-2 text-gray-600">Discover guides, tools, and information for sustainable living</p>
      </div>

      <div className="mb-8">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-6 w-5" />
              <input
                type="text"
                placeholder="Search resources..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="p-2 pl-10 w-1/2 rounded-md border-white/50 shadow-sm outline-none border-2 focus:border-green-500 focus:ring-green-500"
              />
            </div>
          </div>
          <label htmlFor="category-select" className="sr-only">Select Category</label>
          <select
            id="category-select"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="rounded-md px-2 mr-2 border-white/50 shadow-sm border-2 focus:border-green-500 focus:ring-green-500"
          >
            {categories.map(category => (
              <option key={category} value={category}>
                {category.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredResources.map((resource) => (
          <div key={resource.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
            <img
              src={resource.image}
              alt={resource.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900">{resource.title}</h3>
              <p className="mt-2 text-gray-600">{resource.description}</p>
              <div className="mt-4 flex items-center justify-between">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                  {resource.category.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                </span>
                <a
                  href={resource.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-green-600 hover:text-green-700"
                >
                  <LinkIcon className="h-5 w-5 mr-1" />
                  View Resource
                  <ExternalLink className="h-4 w-4 ml-1" />
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}