import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Link } from 'react-router-dom';

export default function CTA() {
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
    <div className="bg-gradient-to-r from-green-700 to-green-600">
      <motion.div
        ref={ref}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        variants={containerVariants}
        className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:py-24 lg:px-8 lg:flex lg:items-center lg:justify-between"
      >
        <motion.div variants={itemVariants}>
          <h2 className="font-bold tracking-tight text-white sm:text-5xl">
            <span className="block">Ready to make a difference?</span>
            <span className="block text-green-200 mt-2">Start your eco-friendly journey today.</span>
          </h2>
        </motion.div>
        <motion.div variants={itemVariants} className="mt-8 flex lg:mt-0 lg:flex-shrink-0 space-x-4">
          <Link
            to="/signup"
            className="inline-flex items-center justify-center px-8 py-4 border border-transparent text-lg font-medium rounded-xl text-green-700 bg-white hover:bg-green-50 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            Get started
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
          <Link
            to="/learn-more"
            className="inline-flex items-center justify-center px-8 py-4 border-2 border-white text-lg font-medium rounded-xl text-white hover:bg-white hover:text-green-700 transform hover:scale-105 transition-all duration-200"
          >
            Learn more
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}