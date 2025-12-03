import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function Reports() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to main page with Reports tab
    router.push('/?tab=reports');
  }, [router]);

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="text-gray-600">Redirecting...</div>
    </div>
  );
}
