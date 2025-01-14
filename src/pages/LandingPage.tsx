import Hero from '../components/Hero';
import Features from '../components/Features';
import CTA from '../components/CTA';

export default function LandingPage() {
  return (
    <div className="bg-white">
      <Hero />
      <Features />
      <CTA />
    </div>
  );
}