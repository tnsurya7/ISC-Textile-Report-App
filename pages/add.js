import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function AddRecord() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to main page with Add tab
    router.push('/?tab=add');
  }, [router]);

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="text-gray-600">Redirecting...</div>
    </div>
  );
}
