import { useEffect, useState } from 'react';

export default function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showInstall, setShowInstall] = useState(false);

  useEffect(() => {
    const handler = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowInstall(true);
    };

    window.addEventListener('beforeinstallprompt', handler);

    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    
    if (outcome === 'accepted') {
      setShowInstall(false);
    }
    
    setDeferredPrompt(null);
  };

  if (!showInstall) return null;

  return (
    <div className="fixed bottom-4 right-4 bg-white shadow-lg rounded-lg p-4 max-w-sm border border-gray-200">
      <div className="flex items-start space-x-3">
        <div className="flex-1">
          <h3 className="font-semibold text-gray-800">Install App</h3>
          <p className="text-sm text-gray-600 mt-1">
            Install Indian Soft Colours app for quick access
          </p>
        </div>
        <button
          onClick={() => setShowInstall(false)}
          className="text-gray-400 hover:text-gray-600"
        >
          ✕
        </button>
      </div>
      <div className="mt-3 flex space-x-2">
        <button
          onClick={handleInstall}
          className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700"
        >
          Install
        </button>
        <button
          onClick={() => setShowInstall(false)}
          className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800"
        >
          Later
        </button>
      </div>
    </div>
  );
}
