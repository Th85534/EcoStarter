import { Leaf } from 'lucide-react';

interface LeafLoaderProps {
  size?: 'sm' | 'md' | 'lg';
}

export default function LeafLoader({ size = 'md' }: LeafLoaderProps) {
  const sizeClasses = {
    sm: 'h-6 w-6',
    md: 'h-10 w-10',
    lg: 'h-16 w-16'
  };

  return (
    <div className="flex items-center justify-center">
      <div className={`animate-spin ${sizeClasses[size]} text-green-600`}>
        <Leaf />
      </div>
    </div>
  );
}