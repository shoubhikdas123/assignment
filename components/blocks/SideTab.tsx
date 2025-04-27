'use client';

import { useState, useEffect } from 'react';
import { LayoutGrid, Award, FileText } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Sidebar() {
  const pathname = usePathname();
  const [activeTab, setActiveTab] = useState('dashboard');

  useEffect(() => {
    // Set active tab based on current path
    if (pathname === '/') setActiveTab('dashboard');
    else if (pathname.includes('/skill-test')) setActiveTab('skillTest');
    else if (pathname.includes('/internship')) setActiveTab('internship');
  }, [pathname]);

  const navigationItems = [
    {
      name: 'Dashboard',
      href: '/',
      icon: LayoutGrid,
      id: 'dashboard'
    },
    {
      name: 'Skill Test',
      href: '/skill-test',
      icon: Award,
      id: 'skillTest'
    },
    {
      name: 'Internship',
      href: '/internship',
      icon: FileText,
      id: 'internship'
    }
  ];

  return (
    <aside className="w-56 border-r border-gray-200 bg-white h-full">
      <nav className="py-4">
        <ul className="space-y-1">
          {navigationItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <li key={item.id}>
                <Link 
                  href={item.href}
                  className={`flex items-center px-6 py-3 text-sm font-medium ${
                    isActive 
                      ? 'bg-blue-50 text-blue-600' 
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <item.icon className={`h-5 w-5 mr-3 ${isActive ? 'text-blue-600' : 'text-gray-500'}`} />
                  {item.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}