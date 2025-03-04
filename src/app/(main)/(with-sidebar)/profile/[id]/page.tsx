"use client"
import React, { useEffect, useState } from 'react';
import ProfileInformationForm from '@/components/profile/profile-information-form';
import ProfileServices from '@/components/profile/profile-services';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { ChevronLeft } from 'lucide-react';
// import CalendarAvailability from '@/components/profile/calander-availablity';
import { useIsMobile } from '@/hooks/use-mobile';

const items = [
  {
    icon: '/images/user-icon.svg',
    title: 'Personal Information',
    value: 'personal-information',
    component: ProfileInformationForm,
  },
  {
    icon: '/images/meeting-icon.svg',
    title: 'Add Services',
    value: 'add-services',
    component: ProfileServices,
  },
  // {
  //   icon: '/images/calander-icon.svg',
  //   title: 'Calendar',
  //   value: 'calander',
  //   component: CalendarAvailability,
  // },
  // {
  //   icon: '/images/description-icon.svg',
  //   title: 'Portfolio',
  //   value: 'portfolio',
  //   component: () => <div>Portfolio Content</div>,
  // },


   {
    icon: "/images/description-icon.svg",
    title: "Portfolio 🔒",
    value: "portfolio",
  component: () => (
    <div className="flex items-center justify-center h-full text-center">
Unlock Premium Features!
 <br />        
Premium access is reserved for experts who complete 5 more paid meetings and 2 paid events

    </div>
  ),
     
  },

  {
    icon: "/images/description-icon.svg",
    title: "Email Campaign 🔒",
    value: "Email Campaign",
  component: () => (
    <div className="flex items-center justify-center h-full text-center">
Unlock Premium Features!
 <br />        
Premium access is reserved for experts who complete 5 more paid meetings and 2 paid events

    </div>
  ),  },
  {
    icon: "/images/description-icon.svg",
    title: "Analytics 🔒",
    value: "Analytics",
  component: () => (
    <div className="flex items-center justify-center h-full text-center">
Unlock Premium Features!
 <br />        
Premium access is reserved for experts who complete 5 more paid meetings and 2 paid events

    </div>
  ),  },
  {
    icon: "/images/description-icon.svg",
    title: "Affiliate Marketing 🔒",
    value: "Affiliate Marketing",
  component: () => (
    <div className="flex items-center justify-center h-full text-center">
Unlock Premium Features!
 <br />        
Premium access is reserved for experts who complete 5 more paid meetings and 2 paid events

    </div>
  ),  },

  {
    icon: "/images/description-icon.svg",
    title: "Whatsapp Marketing 🔒",
    value: "Whatsapp Marketing",
  component: () => (
    <div className="flex items-center justify-center h-full text-center">
Unlock Premium Features!
 <br />        
Premium access is reserved for experts who complete 5 more paid meetings and 2 paid events

    </div>
  ),  },
  {
    icon: "/images/description-icon.svg",
    title: "Referral Program 🔒",
    value: "Referral Program",
  component: () => (
    <div className="flex items-center justify-center h-full text-center">
Unlock Premium Features!
 <br />        
Premium access is reserved for experts who complete 5 more paid meetings and 2 paid events

    </div>
  ),  },
];

export default function ProfileSettings() {
  const [selectedTab, setSelectedTab] = useState<string | null>(null);
  const [showMobileContent, setShowMobileContent] = useState(false);
  const isMobile = useIsMobile();

  const SelectedComponent = items.find((item) => item.value === selectedTab)?.component;

  useEffect(()=>{
    if(!selectedTab && !isMobile){
      setSelectedTab('personal-information')
    }
  },[isMobile]);

  // Sync URL with selectedTab
  useEffect(() => {
    if (selectedTab) {
      window.history.pushState({ item: selectedTab }, '', `?item=${selectedTab}`);
    } else {
      window.history.pushState(null, '', window.location.pathname);
    }
  }, [selectedTab]);

  // Handle browser back/forward navigation
  useEffect(() => {
    const handlePopState = (event: PopStateEvent) => {
      if (event.state?.item) {
        setSelectedTab(event.state.item);
        setShowMobileContent(true); // Show content on forward navigation
      } else {
        setSelectedTab(null);
        setShowMobileContent(false); // Show list on back navigation
      }
    };

    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  // Handle mobile list item click
  const handleItemClick = (value: string) => {
    setSelectedTab(value);
    setShowMobileContent(true);
  };

  // Handle mobile back button click
  const handleMobileBack = () => {
    setSelectedTab(null);
    setShowMobileContent(false);
    window.history.back(); // Navigate back in history
  };


  const MobileList = () => (
    <div className="space-y-4 p-4">
      {items.map((item) => (
        <button
          key={item.value}
          onClick={() => handleItemClick(item.value)}
          className="w-full flex items-center gap-4 p-4 rounded-lg bg-background hover:bg-accent"
        >
          <div className="flex justify-center items-center p-3 rounded-full h-12 w-12 bg-[#FAFAFA]">
            <Image
              src={item.icon}
              width={24}
              height={24}
              alt={item.title}
              className="object-contain object-center h-6 w-6"
            />
          </div>
          <p className="font-semibold text-foreground">{item.title}</p>
        </button>
      ))}
    </div>
  );

  const MobileContent = () => (
    <div className="h-full">
      <div className="flex items-center gap-2 p-4 border-b">
        <button
          onClick={handleMobileBack}
          className="p-2 hover:bg-accent rounded-full"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
        <h2 className="font-semibold">
          {items.find((item) => item.value === selectedTab)?.title}
        </h2>
      </div>
      <div className="p-4">{SelectedComponent && <SelectedComponent  />}</div>
    </div>
  );

  return (
    <>
      {/* Mobile Layout */}
      <div className="md:hidden h-full">
        {showMobileContent ? <MobileContent /> : <MobileList />}
      </div>

      {/* Desktop Layout */}
      <div className="hidden md:flex flex-1">
        <Tabs
          value={selectedTab || ''}
          onValueChange={(value) => setSelectedTab(value)}
          className="flex gap-4 flex-1"
        >
          <TabsList className="flex-col py-4 h-full bg-background rounded-none justify-start items-start border-r border-[#F1F2F4] w-72">
            {items.map((item) => (
              <TabsTrigger
                key={item.value}
                className={cn(
                  'w-full px-4 py-3 flex justify-start gap-4 !shadow-none data-[state=active]:bg-[#FAFAFA]'
                )}
                value={item.value}
              >
                <div className="flex justify-center items-center p-3 rounded-full h-12 w-12 bg-[#FAFAFA]">
                  <Image
                    src={item.icon}
                    width={24}
                    height={24}
                    alt={item.title}
                    className="object-contain object-center h-6 w-6"
                  />
                </div>
                <p className="font-semibold text-foreground">{item.title}</p>
              </TabsTrigger>
            ))}
          </TabsList>
          <div className="flex-1 p-6">
            {SelectedComponent && <SelectedComponent />}
          </div>
        </Tabs>
      </div>
    </>
  );
}
