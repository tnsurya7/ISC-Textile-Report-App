import Navbar from './Navbar';
import Sidebar from './Sidebar';
import InstallPrompt from './InstallPrompt';

export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <InstallPrompt />
      <div className="flex flex-1">
        <div className="hidden lg:block">
          <Sidebar />
        </div>
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-full overflow-x-hidden overflow-y-auto pb-20">
          {children}
        </main>
      </div>
      
      {/* Footer */}
      <footer className="py-6 border-t-2 border-gray-300 text-center bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4">
          <p className="text-sm text-gray-700">
            © 2025. All Rights Reserved. Developed by{' '}
            <a 
              href="https://suryakumar-portfolio-chi.vercel.app/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-700 font-semibold underline"
            >
              SURYA KUMAR M
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}
