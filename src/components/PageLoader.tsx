import LeafLoader from './LeafLoader';

export default function PageLoader() {
  return (
    <div className="fixed inset-0 bg-white bg-opacity-90 z-50 flex items-center justify-center">
      <div className="text-center">
        <LeafLoader size="lg" />
        <p className="mt-4 text-green-600 font-medium">Loading...</p>
      </div>
    </div>
  );
}