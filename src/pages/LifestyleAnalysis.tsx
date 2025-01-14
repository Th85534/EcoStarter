import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { analyzeLifestyle } from '../lib/gemini';

interface LifestyleForm {
  transportation: string;
  diet: string;
  energy: string;
  shopping: string;
  waste: string;
  additional: string;
}

export default function LifestyleAnalysis() {
  const { register, handleSubmit, formState: { errors } } = useForm<LifestyleForm>();
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (data: LifestyleForm) => {
    try {
      setLoading(true);
      setError(null);
      const result = await analyzeLifestyle(data);
      setAnalysis(result);
    } catch (err) {
      setError('Failed to analyze lifestyle. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="px-6 py-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Lifestyle Analysis</h1>
          <p className="text-gray-600 mb-8">
            Answer a few questions about your lifestyle to get personalized eco-friendly recommendations.
          </p>

          {!analysis ? (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  What is your primary mode of transportation?
                </label>
                <select
                  {...register('transportation', { required: 'This field is required' })}
                  className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm outline-none focus:border-2 focus:border-green-500 focus:ring-green-500"
                >
                  <option value="">Select an option</option>
                  <option value="car">Personal Car</option>
                  <option value="public">Public Transportation</option>
                  <option value="bicycle">Bicycle</option>
                  <option value="walking">Walking</option>
                  <option value="mixed">Mixed</option>
                </select>
                {errors.transportation && (
                  <p className="mt-1 text-sm text-red-600">{errors.transportation.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  What best describes your diet?
                </label>
                <select
                  {...register('diet', { required: 'This field is required' })}
                  className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm outline-none focus:border-2 focus:border-green-500 focus:ring-green-500"
                >
                  <option value="">Select an option</option>
                  <option value="omnivore">Omnivore</option>
                  <option value="vegetarian">Vegetarian</option>
                  <option value="vegan">Vegan</option>
                  <option value="pescatarian">Pescatarian</option>
                  <option value="flexitarian">Flexitarian</option>
                </select>
                {errors.diet && (
                  <p className="mt-1 text-sm text-red-600">{errors.diet.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  How do you manage your home energy use?
                </label>
                <select
                  {...register('energy', { required: 'This field is required' })}
                  className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm outline-none focus:border-2 focus:border-green-500 focus:ring-green-500"
                >
                  <option value="">Select an option</option>
                  <option value="standard">Standard Grid Energy</option>
                  <option value="renewable">Renewable Energy</option>
                  <option value="mixed">Mixed Sources</option>
                  <option value="efficient">Energy Efficient Appliances</option>
                </select>
                {errors.energy && (
                  <p className="mt-1 text-sm text-red-600">{errors.energy.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  What are your shopping habits?
                </label>
                <select
                  {...register('shopping', { required: 'This field is required' })}
                  className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm outline-none focus:border-2 focus:border-green-500 focus:ring-green-500"
                >
                  <option value="">Select an option</option>
                  <option value="new">Mostly New Items</option>
                  <option value="secondhand">Prefer Secondhand</option>
                  <option value="minimal">Minimal Shopping</option>
                  <option value="mixed">Mix of New and Secondhand</option>
                </select>
                {errors.shopping && (
                  <p className="mt-1 text-sm text-red-600">{errors.shopping.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  How do you handle waste management?
                </label>
                <select
                  {...register('waste', { required: 'This field is required' })}
                  className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm outline-none focus:border-2 focus:border-green-500 focus:ring-green-500"
                >
                  <option value="">Select an option</option>
                  <option value="recycle">Regular Recycling</option>
                  <option value="compost">Recycling and Composting</option>
                  <option value="minimal">Minimal Waste Lifestyle</option>
                  <option value="standard">Standard Waste Disposal</option>
                </select>
                {errors.waste && (
                  <p className="mt-1 text-sm text-red-600">{errors.waste.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Any additional information about your lifestyle?
                </label>
                <textarea
                  {...register('additional')}
                  rows={4}
                  className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm outline-none focus:border-2 focus:border-green-500 focus:ring-green-500"
                  placeholder="Optional: Share any other details that might help us provide better recommendations..."
                />
              </div>

              {error && (
                <div className="text-red-500 text-sm text-center">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Analyzing...' : 'Get Recommendations'}
              </button>
            </form>
          ) : (
            <div className="space-y-6">
              <div className="prose max-w-none">
                <div className="bg-green-50 p-6 rounded-lg">
                  <h2 className="text-xl font-semibold text-green-800 mb-4">Your Personalized Recommendations</h2>
                  <div className="text-green-700 whitespace-pre-line">
                    {analysis}
                  </div>
                </div>
              </div>
              <button
                onClick={() => setAnalysis(null)}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                Start New Analysis
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}