import Navbar from './Navbar';
import Sidebar from './Sidebar';
import InstallPrompt from './InstallPrompt';

export default function Layout({ children }) {
  return (
    <>
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
      
      {/* Footer */}
      <footer className="py-4 border-t border-gray-200 text-center bg-white">
        <p className="text-sm text-gray-600">
          © 2025. All Rights Reserved. Developed by{' '}
          <a 
            href="https://suryakumar-portfolio-chi.vercel.app/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            SURYA KUMAR M
          </a>
        </p>
      </footer>
    </>
  );
}
