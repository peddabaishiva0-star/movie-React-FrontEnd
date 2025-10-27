import React from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const sidebarOpen = useSelector((state: RootState) => state.ui.sidebarOpen);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className={`flex-1 transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-0'}`}>
          <div className="p-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;
