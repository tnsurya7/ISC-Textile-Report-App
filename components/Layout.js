import Navbar from './Navbar';
import Sidebar from './Sidebar';
import InstallPrompt from './InstallPrompt';

export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="flex">
        <div className="hidden lg:block">
          <Sidebar />
        </div>
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-full overflow-x-hidden">
          {children}
        </main>
      </div>
      <InstallPrompt />
    </div>
  );
}
