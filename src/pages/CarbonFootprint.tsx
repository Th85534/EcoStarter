import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Car, Lightbulb, ShoppingBag, Trash2, Plus } from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import { db } from '../lib/firebase';
import { collection, query, where, orderBy, getDocs, addDoc, Timestamp } from 'firebase/firestore';
import { calculateCarbonFootprint } from '../lib/gemini';

interface CarbonData {
  id?: string;
  userId: string;
  date: Date;
  total: number;
  transportation: number;
  energy: number;
  consumption: number;
  waste: number;
}

export default function CarbonFootprint() {
  const { user } = useAuthStore();
  const [carbonData, setCarbonData] = useState<CarbonData[]>([]);
  const [showLogForm, setShowLogForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    transportation: '',
    energy: '',
    consumption: '',
    waste: ''
  });

  useEffect(() => {
    if (user) {
      loadCarbonData();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const loadCarbonData = async () => {
    if (!user) return;

    const q = query(
      collection(db, 'carbonFootprints'),
      where('userId', '==', user.uid),
      orderBy('date', 'asc')
    );

    const querySnapshot = await getDocs(q);
    const data: CarbonData[] = [];
    querySnapshot.forEach((doc) => {
      const footprint = doc.data();
      data.push({
        id: doc.id,
        ...footprint,
        date: footprint.date.toDate()
      } as CarbonData);
    });

    setCarbonData(data);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setLoading(true);
    try {
      const aiResult = await calculateCarbonFootprint({
        transportation: formData.transportation,
        energy: formData.energy,
        consumption: formData.consumption,
        waste: formData.waste
      });

      const newEntry: Omit<CarbonData, 'id'> = {
        userId: user.uid,
        date: new Date(),
        total: aiResult.monthlyFootprint,
        transportation: aiResult.breakdown.transportation,
        energy: aiResult.breakdown.energy,
        consumption: aiResult.breakdown.consumption,
        waste: aiResult.breakdown.waste
      };

      await addDoc(collection(db, 'carbonFootprints'), {
        ...newEntry,
        date: Timestamp.fromDate(newEntry.date)
      });

      await loadCarbonData();
      setShowLogForm(false);
      setFormData({
        transportation: '',
        energy: '',
        consumption: '',
        waste: ''
      });
    } catch (error) {
      console.error('Error saving carbon footprint:', error);
    } finally {
      setLoading(false);
    }
  };

  const chartData = carbonData.map((data) => ({
    month: data.date.toLocaleDateString('en-US', { month: 'short', year: '2-digit' }),
    emissions: data.total,
    transportation: data.transportation,
    energy: data.energy,
    consumption: data.consumption,
    waste: data.waste
  }));

  const categories = [
    {
      name: 'Transportation',
      icon: Car,
      value: carbonData[carbonData.length - 1]?.transportation || 0,
      tips: 'Consider carpooling or using public transport to reduce emissions.'
    },
    {
      name: 'Energy Usage',
      icon: Lightbulb,
      value: carbonData[carbonData.length - 1]?.energy || 0,
      tips: 'Switch to LED bulbs and energy-efficient appliances.'
    },
    {
      name: 'Consumption',
      icon: ShoppingBag,
      value: carbonData[carbonData.length - 1]?.consumption || 0,
      tips: 'Buy local and reduce single-use products.'
    },
    {
      name: 'Waste',
      icon: Trash2,
      value: carbonData[carbonData.length - 1]?.waste || 0,
      tips: 'Implement recycling and composting practices.'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24">
      <div className="mb-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Carbon Footprint Tracker</h1>
            <p className="mt-2 text-gray-600">Monitor and reduce your environmental impact</p>
          </div>
          <button
            onClick={() => setShowLogForm(true)}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700"
          >
            <Plus className="h-5 w-5 mr-2" />
            Log Weekly Data
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Monthly Emissions Trend</h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart 
                  data={chartData}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="emissions"
                    name="Total Emissions"
                    stroke="#059669"
                    strokeWidth={2}
                    dot={{ fill: '#059669' }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div>
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Current Week Breakdown</h2>
            <div className="space-y-6">
              {categories.map((category) => (
                <div key={category.name} className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="p-2 bg-green-100 rounded-lg">
                      <category.icon className="h-6 w-6 text-green-600" />
                    </div>
                  </div>
                  <div className="ml-4 flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-medium text-gray-900">{category.name}</h3>
                      <span className="text-sm text-gray-500">{category.value.toFixed(1)} kg CO2</span>
                    </div>
                    <div className="mt-1">
                      <div className="bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-green-600 rounded-full h-2"
                          style={{ width: `${(category.value / (carbonData[carbonData.length - 1]?.total || 100)) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                    <p className="mt-2 text-sm text-gray-600">{category.tips}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {showLogForm && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Log Monthly Carbon Data</h3>
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Transportation Details</label>
                  <textarea
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                    rows={2}
                    value={formData.transportation}
                    onChange={(e) => setFormData({ ...formData, transportation: e.target.value })}
                    placeholder="e.g., Daily commute by car (20km), weekend bike rides"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Energy Usage</label>
                  <textarea
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                    rows={2}
                    value={formData.energy}
                    onChange={(e) => setFormData({ ...formData, energy: e.target.value })}
                    placeholder="e.g., Monthly electricity usage, heating/cooling habits"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Consumption Patterns</label>
                  <textarea
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                    rows={2}
                    value={formData.consumption}
                    onChange={(e) => setFormData({ ...formData, consumption: e.target.value })}
                    placeholder="e.g., Shopping habits, food choices, product purchases"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Waste Management</label>
                  <textarea
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                    rows={2}
                    value={formData.waste}
                    onChange={(e) => setFormData({ ...formData, waste: e.target.value })}
                    placeholder="e.g., Recycling habits, composting, waste reduction efforts"
                  />
                </div>
              </div>
              <div className="mt-5 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowLogForm(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 border border-gray-300 rounded-md"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-4 py-2 text-sm font-medium text-white bg-green-600 hover:bg-green-700 rounded-md disabled:opacity-50"
                >
                  {loading ? 'Calculating...' : 'Save Entry'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}