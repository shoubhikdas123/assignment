"use client"
import { useState } from 'react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';
import man from "@/public/images/man.webp"
import Image from 'next/image';
import logo from "@/public/logos/logo1.webp"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="w-full py-6 px-4 bg-white border-b border-gray-200  flex items-center justify-between">
      {/* Logo */}
      <div className="flex items-center">
        <div className="flex items-center space-x-2">
          <div className="flex flex-col items-center justify-center">
            <Image className='scale-[1.4]' src={logo} alt={"logo"}/>
          </div>
          <h1 className="text-xl font-bold ml-2">WhatBytes</h1>
        </div>
      </div>

      {/* Mobile menu button */}
      <div className="md:hidden">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="p-1"
        >
          <Menu className="h-6 w-6" />
        </Button>
      </div>

      {/* User profile */}
      <div className="hidden border border-slate-400/10 px-2 py-2 rounded-lg md:flex items-center">
        <Avatar className="h-6 w-6">
          <AvatarImage className='object-cover' src="/images/man.webp" alt="User" />
          <AvatarFallback>RS</AvatarFallback>
        </Avatar>
        <span className="ml-2 text-sm font-medium">Rahil Siddique</span>
      </div>

      {/* Mobile menu (hidden by default) */}
      {isMenuOpen && (
        <div className="absolute top-16 right-0 w-full bg-white shadow-md z-50 md:hidden">
          <div className="p-4 border-t border-gray-200">
            <div className="flex items-center">
              <Avatar className="h-8 w-8">
                <AvatarImage className='object-cover'  src="/images/man.webp" alt="User" />
                <AvatarFallback>RS</AvatarFallback>
              </Avatar>
              <span className="ml-2 text-sm font-medium">Rahil Siddique</span>
            </div>
            {/* Add more menu items as needed */}
          </div>
        </div>
      )}
    </header>
  );
}