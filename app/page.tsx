"use client"
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import check from "@/public/logos/check.png"
import html from "@/public/images/html.png"
import { File, ChartNoAxesColumn, Medal, Menu } from 'lucide-react';
import { UpdateScoresDialog } from '@/components/blocks/Dialogue';
import Chart from '@/components/blocks/Graph';
import { PieC } from '@/components/blocks/Chart';
import up from "@/public/logos/up.png"

export default function TabNavigationShadcn() {
  const [activeTab, setActiveTab] = useState('skillTest');
  const [openDialog, setOpenDialog] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [data, setData] = useState({
    rank: "1",
    percentile: "20",
    currentScore: "10"
  });

  // Check for mobile view on component mount and window resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Initial check
    checkMobile();
    
    // Add event listener
    window.addEventListener('resize', checkMobile);
    
    // Cleanup
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleSave = (data: { rank: string; percentile: string; currentScore: string }) => {
    console.log("Saved data:", data);
    setData(data);
    setOpenDialog(false);
  };

  // Main content for the skill test tab
  const SkillTestContent = () => (
    <div className="flex flex-col bg-gray-50">
      <h1 className="text-xl font-semibold mb-6">Skill Test</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Left Column - Test Results */}
        <div className="space-y-6 lg:col-span-2">
          {/* Test Header */}
          <Card>
            <CardContent className="p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16">
                    <Image src={html} alt="logo" width={500} />
                  </div>
                </div>
                <div className="flex-1 text-center sm:text-left">
                  <h2 className="text-lg font-semibold">Hyper Text Markup Language</h2>
                  <p className="text-gray-600 text-sm">Questions: 08 | Duration: 15 mins | Submitted on 5 June 2021</p>
                </div>
                <button onClick={() => setOpenDialog(true)} className="bg-blue-950 text-white px-5 py-2 rounded-lg text-sm font-medium mt-3 sm:mt-0">
                  Update
                </button>
              </div>
            </CardContent>
          </Card>
          
          {/* Quick Statistics */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Quick Statistics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="flex flex-row items-center text-center">
                  <div className="bg-slate-200 p-2 rounded-full mb-2">
                    <span className="text-yellow-600 text-xl">🏆</span>
                  </div>
                  <div className="flex text-left ml-2 flex-col">
                    <span className="text-xl font-bold">{data.rank}</span>
                    <span className="text-xs text-gray-500">YOUR RANK</span>
                  </div>
                </div>
                
                <div className="flex items-center text-center">
                  <div className="bg-slate-200 p-2 rounded-full mb-2">
                    <span className="text-gray-600 text-xl">📊</span>
                  </div>
                  <div className="flex text-left ml-2 flex-col">
                    <span className="text-xl font-bold">{data.percentile}%</span>
                    <span className="text-xs text-gray-500">PERCENTILE</span>
                  </div>
                </div>
                
                <div className="flex items-center text-center">
                  <div className="bg-slate-200 w-12 h-12 p-2 rounded-full mb-2">
                    <Image className="scale-[0.65]" src={check} alt="check" />
                  </div>
                  <div className="flex text-left ml-2 flex-col">
                    <span className="text-xl font-bold">{data.currentScore}/15</span>
                    <span className="text-xs text-gray-500">CORRECT ANSWERS</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
        
          <Card>
            <CardHeader className="pb-2 flex flex-row items-center justify-between">
              <CardTitle className=" font-bold">Comparison Graph</CardTitle>
              <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
      <Image src={up} alt="Graph Icon" className="w-6 h-6" />
    </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm mb-4">
                <span className="font-medium">You scored {data.percentile}% percentile</span> which is lower than the 
                average percentile 72% of all the engineers who took this assessment
              </p>
              <Chart percentile={parseInt(data.percentile)} />
            </CardContent>
          </Card>
        </div>
        
 
        <div className="space-y-6">
          {/* Syllabus Analysis */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Syllabus Wise Analysis</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm">HTML Tools, Forms, History</span>
                  <span className="text-blue-600 font-medium">80%</span>
                </div>
                <Progress value={80} col="bg-blue-600" className="h-2 bg-blue-100" />
              </div>
              
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm">Tags & References in HTML</span>
                  <span className="text-orange-600 font-medium">60%</span>
                </div>
                <Progress value={60} col="bg-orange-600" className="h-2 bg-orange-100" />
              </div>
              
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm">Tables & References in HTML</span>
                  <span className="text-red-600 font-medium">24%</span>
                </div>
                <Progress value={24} col="bg-red-600" className="h-2 bg-red-100" />
              </div>
              
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm">Tables & CSS Basics</span>
                  <span className="text-green-600 font-medium">96%</span>
                </div>
                <Progress value={96} col="bg-green-600" className="h-2 bg-green-100" />
              </div>
            </CardContent>
          </Card>
          
          {/* Question Analysis */}
          <Card>
            <CardHeader className="pb-2">
              <div className="flex justify-between">
                <CardTitle className="text-base">Question Analysis</CardTitle>
                <span className="text-blue-600 font-medium">{data.currentScore}/15</span>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm mb-8">
                <span className="font-medium">You scored {data.currentScore} question correct out of 15.</span> However it still 
                needs some improvements
              </p>
              <PieC answered={parseInt(data.currentScore)} />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-50">
      {/* Mobile Header with menu button */}
      <div className="md:hidden flex items-center justify-between p-4 bg-white border-b">
        <div className="text-lg font-semibold">WhatBytes</div>
        <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon">
              <Menu />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[80%] sm:w-64 p-0">
            {/* Added SheetHeader and SheetTitle for accessibility */}
            <SheetHeader className="px-4 pt-4">
              <SheetTitle>Navigation</SheetTitle>
            </SheetHeader>
            <div className="pt-4 px-4">
              {/* Mobile Navigation */}
              <Tabs 
                value={activeTab} 
                onValueChange={(value) => {
                  setActiveTab(value);
                  setIsMenuOpen(false);
                }}
                orientation="vertical" 
                className="w-full"
              >
                <TabsList className="flex flex-col w-full h-auto bg-transparent space-y-1">
                  <TabsTrigger 
                    value="dashboard" 
                    className="justify-start rounded-r-3xl px-3 py-2 text-left data-[state=active]:bg-blue-50 data-[state=active]:text-blue-600 data-[state=active]:shadow-none w-full"
                  >
                    <div className="flex items-center">
                      <ChartNoAxesColumn className="mr-3" />
                      <span>Dashboard</span>
                    </div>
                  </TabsTrigger>
                  
                  <TabsTrigger 
                    value="skillTest" 
                    className="justify-start rounded-r-3xl px-3 py-2 text-left data-[state=active]:bg-blue-50 data-[state=active]:text-blue-600 data-[state=active]:shadow-none w-full"
                  >
                    <div className="flex items-center">
                      <Medal className="mr-3" />
                      <span>Skill Test</span>
                    </div>
                  </TabsTrigger>
                  
                  <TabsTrigger 
                    value="internship" 
                    className="justify-start rounded-r-3xl px-3 py-2 text-left data-[state=active]:bg-blue-50 data-[state=active]:text-blue-600 data-[state=active]:shadow-none w-full"
                  >
                    <div className="flex items-center">
                      <File className="mr-3" />
                      <span>Internship</span>
                    </div>
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* Dialog component */}
      <UpdateScoresDialog open={openDialog} setOpen={setOpenDialog} onSave={handleSave} />

      {/* Main content area with responsive layout */}
      <div className="flex flex-col md:flex-row flex-1">
        {/* Sidebar navigation - hidden on mobile */}
        <div className="hidden md:block w-64 border-r bg-white">
          <div className="p-4 border-b">
            <div className="text-lg font-semibold">WhatBytes</div>
          </div>
          <div className="pt-8">
            <Tabs 
              value={activeTab} 
              onValueChange={setActiveTab}
              orientation="vertical" 
              className="w-full scale-[1.1]"
            >
              <TabsList className="flex flex-col w-[80%] h-auto bg-transparent space-y-1">
                <TabsTrigger 
                  value="dashboard" 
                  className="justify-start rounded-r-3xl px-3 py-2 text-left data-[state=active]:bg-blue-50 data-[state=active]:text-blue-600 data-[state=active]:shadow-none w-full"
                >
                  <div className="flex items-center">
                    <ChartNoAxesColumn className="mr-3" />
                    <span>Dashboard</span>
                  </div>
                </TabsTrigger>
                
                <TabsTrigger 
                  value="skillTest" 
                  className="justify-start rounded-r-3xl px-3 py-2 text-left data-[state=active]:bg-blue-50 data-[state=active]:text-blue-600 data-[state=active]:shadow-none w-full"
                >
                  <div className="flex items-center">
                    <Medal className="mr-3" />
                    <span>Skill Test</span>
                  </div>
                </TabsTrigger>
                
                <TabsTrigger 
                  value="internship" 
                  className="justify-start rounded-r-3xl px-3 py-2 text-left data-[state=active]:bg-blue-50 data-[state=active]:text-blue-600 data-[state=active]:shadow-none w-full"
                >
                  <div className="flex items-center">
                    <File className="mr-3" />
                    <span>Internship</span>
                  </div>
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>

        {/* Mobile Navigation Tabs (Icon only) - visible below header on small screens */}
        <div className="md:hidden border-b bg-white">
          <Tabs 
            value={activeTab} 
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="flex justify-evenly bg-transparent py-2">
              <TabsTrigger 
                value="dashboard" 
                className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-600 rounded-md"
              >
                <div className="flex items-center px-3 py-1">
                  <ChartNoAxesColumn size={18} />
                  <span className="hidden sm:inline ml-2">Dashboard</span>
                </div>
              </TabsTrigger>
              
              <TabsTrigger 
                value="skillTest" 
                className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-600 rounded-md"
              >
                <div className="flex items-center px-3 py-1">
                  <Medal size={18} />
                  <span className="hidden sm:inline ml-2">Skill Test</span>
                </div>
              </TabsTrigger>
              
              <TabsTrigger 
                value="internship" 
                className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-600 rounded-md"
              >
                <div className="flex items-center px-3 py-1">
                  <File size={18} />
                  <span className="hidden sm:inline ml-2">Internship</span>
                </div>
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* Main content based on active tab */}
        <div className="flex-1 p-4 md:p-6">
          {/* Content for both desktop and mobile */}
          {activeTab === 'dashboard' && (
            <Card>
              <CardHeader>
                <CardTitle>Dashboard</CardTitle>
                <CardDescription>View your summary and statistics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="border rounded-lg p-4">
                    <div className="text-2xl font-bold">12</div>
                    <div className="text-sm text-gray-500">Applications</div>
                  </div>
                  <div className="border rounded-lg p-4">
                    <div className="text-2xl font-bold">3</div>
                    <div className="text-sm text-gray-500">Interviews</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {activeTab === 'skillTest' && <SkillTestContent />}

          {activeTab === 'internship' && (
            <Card>
              <CardHeader>
                <CardTitle>Internship Opportunities</CardTitle>
                <CardDescription>Browse and apply for available positions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="border rounded-lg p-4">
                    <h3 className="font-medium">Software Development Intern</h3>
                    <p className="text-sm text-gray-500">Available: 5 positions</p>
                    <Button variant="outline" className="mt-2">Apply Now</Button>
                  </div>
                  <div className="border rounded-lg p-4">
                    <h3 className="font-medium">Data Science Intern</h3>
                    <p className="text-sm text-gray-500">Available: 3 positions</p>
                    <Button variant="outline" className="mt-2">Apply Now</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}