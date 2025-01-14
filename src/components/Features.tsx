import { Recycle, TreePine, Users, Battery } from 'lucide-react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

export default function Features() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  const features = [
    {
      icon: TreePine,
      title: "Personalized Plan",
      description: "Get a customized eco-friendly lifestyle plan based on your habits and goals.",
      bgColor: "bg-green-100",
      iconColor: "text-green-600"
    },
    {
      icon: Recycle,
      title: "Daily Challenges",
      description: "Complete fun and meaningful eco-challenges to build sustainable habits.",
      bgColor: "bg-blue-100",
      iconColor: "text-blue-600"
    },
    {
      icon: Users,
      title: "Community Support",
      description: "Join a community of eco-conscious individuals sharing tips and experiences.",
      bgColor: "bg-purple-100",
      iconColor: "text-purple-600"
    },
    {
      icon: Battery,
      title: "Impact Tracking",
      description: "Measure and visualize your environmental impact over time.",
      bgColor: "bg-yellow-100",
      iconColor: "text-yellow-600"
    }
  ];

  return (
    <div className="py-24 bg-gradient-to-b from-white to-green-50">
      <motion.div
        ref={ref}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        variants={containerVariants}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <motion.div variants={itemVariants} className="text-center">
          <h2 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">
            How EcoStarter Works
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-600">
            Your journey to sustainable living made simple and achievable.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          className="mt-20 grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className={`inline-flex ${feature.bgColor} rounded-2xl p-4 mb-6`}>
                <feature.icon className={`h-8 w-8 ${feature.iconColor}`} />
              </div>
              <h3 className="text-xl font-bold text-gray-900">{feature.title}</h3>
              <p className="mt-4 text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
}