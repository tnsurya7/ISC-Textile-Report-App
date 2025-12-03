import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function Records() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to main page with Records tab
    router.push('/?tab=records');
  }, [router]);

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="text-gray-600">Redirecting...</div>
    </div>
  );
}
