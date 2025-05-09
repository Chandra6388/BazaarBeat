
import React from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import MainSidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";
import { useIsMobile } from "@/hooks/use-mobile";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import EnhancedStatisticsGrid from "@/components/dashboard/EnhancedStatisticsGrid";
import EnhancedAudienceOverviewCard from "@/components/dashboard/EnhancedAudienceOverviewCard";
import EnhancedButtonClickTrackingCard from "@/components/dashboard/EnhancedButtonClickTrackingCard";
import EnhancedSignatureOverviewCard from "@/components/dashboard/EnhancedSignatureOverviewCard";
import EnhancedSignatureUseCard from "@/components/dashboard/EnhancedSignatureUseCard";
import SignatureGrid from "@/components/dashboard/SignatureGrid";
import TrendingSignaturePopup from "@/components/signature/TrendingSignaturePopup";

interface SignatureItem {
  id: string;
  title: string;
  date: string;
  status: "active" | "pending" | "expired";
  details?: {
    name: string;
    jobTitle: string;
    company: string;
    email: string;
    phone?: string;
    website?: string;
    layout: string;
  };
}

const dashboardSampleSignatures: SignatureItem[] = [
  {
    id: "sig-1",
    title: "Business Signature",
    date: "Jan 15, 2025",
    status: "active",
    details: {
      name: "Renato Rodic",
      jobTitle: "Mortgage Loan Officer",
      company: "NEXA Mortgage",
      email: "info@nexamortgage.com",
      phone: "(480) 307-4107",
      website: "https://renatarodic.com/",
      layout: "standard"
    }
  },
  {
    id: "sig-2",
    title: "Personal Signature",
    date: "Jan 20, 2025",
    status: "active",
    details: {
      name: "Renato Rodic",
      jobTitle: "Mortgage Loan Officer",
      company: "NEXA Mortgage",
      email: "info@nexamortgage.com",
      phone: "(480) 307-4107",
      website: "https://renatarodic.com/",
      layout: "modern"
    }
  },
  {
    id: "sig-3",
    title: "Marketing Signature",
    date: "Feb 5, 2025",
    status: "pending",
    details: {
      name: "Renato Rodic",
      jobTitle: "Mortgage Loan Officer",
      company: "NEXA Mortgage",
      email: "info@nexamortgage.com",
      phone: "(480) 307-4107",
      website: "https://renatarodic.com/",
      layout: "compact"
    }
  },
  {
    id: "sig-4",
    title: "Conference Signature",
    date: "Feb 10, 2025",
    status: "active",
    details: {
      name: "Renato Rodic",
      jobTitle: "Mortgage Loan Officer",
      company: "NEXA Mortgage",
      email: "info@nexamortgage.com",
      phone: "(480) 307-4107",
      website: "https://renatarodic.com/",
      layout: "standard"
    }
  },
];

const timeFilterOptions = ["Today", "This Week", "This Month", "This Year"];

const Index = () => {
  const isMobile = useIsMobile();
  const [sidebarOpen, setSidebarOpen] = React.useState(false);
  const [selectedTimeFilter, setSelectedTimeFilter] = React.useState("This Week");
  const [selectedYear, setSelectedYear] = React.useState(new Date().getFullYear().toString());

  const availableYears = [
    new Date().getFullYear().toString(),
    (new Date().getFullYear() - 1).toString(),
    (new Date().getFullYear() - 2).toString(),
  ];

  const handleMenuClick = () => {
    setSidebarOpen(true);
  };

  const statsData = {
    day: [
      { title: "Total User", value: 12, change: 2, isPositive: true },
      { title: "Total Active User", value: 254, change: 15, isPositive: true },
      { title: "Total InActive User", value: 254, change: 15, isPositive: true },
      { title: "Subscribers", value: 47, change: -5, isPositive: false },
    ],
    week: [
      { title: "Total User", value: 12, change: 2, isPositive: true },
      { title: "Total Active User", value: 254, change: 15, isPositive: true },
      { title: "Total InActive User", value: 254, change: 15, isPositive: true },
      { title: "Subscribers", value: 47, change: -5, isPositive: false },
    ],
    month: [
      { title: "Total User", value: 12, change: 2, isPositive: true },
      { title: "Total Active User", value: 254, change: 15, isPositive: true },
      { title: "Total InActive User", value: 254, change: 15, isPositive: true },
      { title: "Subscribers", value: 47, change: -5, isPositive: false },
    ]
  };

  return (
    <SidebarProvider defaultOpen={!isMobile}>
      <div className="flex w-full min-h-screen bg-gradient-to-br from-[#001430] to-[#031a3d] font-sans">
        <MainSidebar open={sidebarOpen} onOpenChange={setSidebarOpen} />
        <div
          className="flex flex-col flex-1 transition-all duration-300 ease-in-out"
          style={{
            width: "100%",
            marginLeft: isMobile ? 0 : '250px',
            paddingBottom: isMobile ? '80px' : '0'
          }}
        >
          <Header
            onMenuClick={handleMenuClick}
            username="Chandra"
          />

          <div className="p-6">
            <DashboardHeader
              title="Dashboard"
              subtitle="Welcome back, Chandra"
              timeFilterOptions={timeFilterOptions}
              selectedTimeFilter={selectedTimeFilter}
              onTimeFilterChange={setSelectedTimeFilter}
              yearOptions={availableYears}
              selectedYear={selectedYear}
              onYearChange={setSelectedYear}
            />

            <div className="mt-6">
            <EnhancedStatisticsGrid statsData={statsData} />

            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <EnhancedAudienceOverviewCard />
              <EnhancedButtonClickTrackingCard />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
              <EnhancedSignatureOverviewCard />
              <EnhancedSignatureUseCard />
            </div>

            <div className="mt-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-white text-xl font-semibold">Trending Signatures</h2>
              </div>
              <SignatureGrid
                items={dashboardSampleSignatures}
              />
            </div>

            <div className="mt-6">
              <div className="bg-[#031123] border border-[#112F59] rounded-lg p-6">
                <h2 className="text-xl font-semibold text-white mb-4">Signature Usage Analytics</h2>

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="border-b border-[#112F59]">
                      <tr>
                        <th className="py-3 px-4 text-left text-white">Signature Name</th>
                        <th className="py-3 px-4 text-center text-white">Total Clicks</th>
                        <th className="py-3 px-4 text-center text-white">Social Clicks</th>
                        <th className="py-3 px-4 text-center text-white">Button Clicks</th>
                        <th className="py-3 px-4 text-center text-white">Last Used</th>
                        <th className="py-3 px-4 text-right text-white">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[1, 2, 3].map((item) => (
                        <tr key={item} className="border-b border-[#112F59] hover:bg-[#051b37]">
                          <td className="py-4 px-4 text-white flex items-center">
                            <div className="w-10 h-10 bg-[#112F59] rounded overflow-hidden mr-3">
                              <img
                                src="/lovable-uploads/3a7fe7a9-f38f-4d70-ad8f-5a6858032ffd.png"
                                alt="Signature"
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <span>Business Signature</span>
                          </td>
                          <td className="py-4 px-4 text-center text-white">3,459</td>
                          <td className="py-4 px-4 text-center text-[#01C8A9]">1,250</td>
                          <td className="py-4 px-4 text-center text-white">740</td>
                          <td className="py-4 px-4 text-center text-gray-400">23 Mar 2025</td>
                          <td className="py-4 px-4 text-right">
                            <button className="text-white p-2 hover:bg-[#112F59]/50 rounded-full">
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="1"></circle><circle cx="5" cy="12" r="1"></circle><circle cx="19" cy="12" r="1"></circle></svg>
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Trending Signature Popup */}
      <TrendingSignaturePopup />
    </SidebarProvider>
  );
};

export default Index;
