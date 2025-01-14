import { ArrowRight, Leaf, Droplet, Wind } from 'lucide-react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

export default function Hero() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
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

  return (
    <div className="relative bg-gradient-to-b from-green-50 to-white pt-32 pb-16 overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMtMi4yMSAwLTQgMS43OS00IDRzMS43OSA0IDQgNCA0LTEuNzkgNC00LTEuNzktNC00LTR6bTAgNmMtMS4xIDAtMi0uOS0yLTJzLjktMiAyLTIgMiAuOSAyIDItLjkgMi0yIDJ6IiBmaWxsPSIjMTZhMzRhIiBmaWxsLW9wYWNpdHk9IjAuMSIvPjwvZz48L3N2Zz4=')] opacity-40"></div>
      </div>

      <motion.div
        ref={ref}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        variants={containerVariants}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative"
      >
        <motion.div variants={itemVariants} className="text-center">
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-gray-900 ">
            <span className="block ">
              Start Your
            </span>
            <span className="block p-4 bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-teal-500">Sustainable Journey</span>
          </h1>
          <motion.p
            variants={itemVariants}
            className="mt-6 max-w-lg mx-auto text-xl text-gray-600 sm:max-w-3xl"
          >
            Small steps lead to big changes. Join our community and discover how simple lifestyle adjustments can create a lasting impact on our planet.
          </motion.p>
          <motion.div
            variants={itemVariants}
            className="mt-8 max-w-md mx-auto sm:flex sm:justify-center md:mt-12"
          >
            <a
              href="/signup"
              className="w-full flex items-center justify-center px-8 py-4 border border-transparent text-lg font-medium rounded-xl text-white bg-gradient-to-r from-green-600 to-teal-500 hover:from-green-700 hover:to-teal-600 transform hover:scale-105 transition-all duration-100 shadow-lg hover:shadow-xl"
            >
              Start Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </a>
          </motion.div>
        </motion.div>

        <motion.div
          variants={containerVariants}
          className="mt-24 grid grid-cols-1 gap-8 sm:grid-cols-3"
        >
          {[
            {
              icon: Leaf,
              title: "Daily Eco-Tips",
              description: "Get actionable sustainability tips tailored to your lifestyle.",
              color: "green"
            },
            {
              icon: Droplet,
              title: "Track Progress",
              description: "Monitor your environmental impact and celebrate achievements.",
              color: "blue"
            },
            {
              icon: Wind,
              title: "Community Support",
              description: "Connect with like-minded individuals on your eco-journey.",
              color: "teal"
            }
          ].map((feature) => (
            <motion.div
              key={feature.title}
              variants={itemVariants}
              className="relative bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-shadow duration-300"
            >
              <div className={`absolute -top-6 left-6 bg-${feature.color}-100 rounded-2xl p-4`}>
                <feature.icon className={`h-8 w-8 text-${feature.color}-600`} />
              </div>
              <h3 className="mt-4 text-2xl font-bold text-gray-900">{feature.title}</h3>
              <p className="mt-4 text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
}