
import React from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "lucide-react";

interface TimeFilterOption {
  label: string;
  value: string;
}

interface DashboardHeaderProps {
  title: string;
  subtitle?: string;
  timeFilterOptions: TimeFilterOption[];
  selectedTimeFilter: string;
  onTimeFilterChange: (value: string) => void;
  yearOptions?: string[];
  selectedYear?: string;
  onYearChange?: (value: string) => void;
}

const DashboardHeader = ({
  title,
  subtitle,
  timeFilterOptions,
  selectedTimeFilter,
  onTimeFilterChange,
  yearOptions = [],
  selectedYear = "",
  onYearChange = () => { },
}: DashboardHeaderProps) => {
  return (
    <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 pb-6 border-b border-[#112F59]">
      <div>
        <h1 className="text-xl md:text-2xl font-semibold text-white">{title}</h1>
        {subtitle && <p className="text-gray-400 text-sm mt-1">{subtitle}</p>}
      </div>

      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full sm:w-auto">
        <div className="flex items-center gap-4 w-full sm:w-auto">
          <Tabs value={selectedTimeFilter} onValueChange={onTimeFilterChange} className="w-full sm:w-auto"   >
            <TabsList className="bg-[#051b37] border border-[#112F59] p-1 h-auto">
              {timeFilterOptions.map((option) => (
                <TabsTrigger
                  key={option.value}
                  value={option.value}
                  className="data-[state=active]:bg-[#01C8A9] data-[state=active]:text-white flex-1 sm:flex-none px-4 py-1"
                >
                  {option.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>

          {yearOptions.length > 0 && (
            <Select value={selectedYear} onValueChange={onYearChange}>
              <SelectTrigger className="w-[110px] bg-[#051b37] border-[#112F59] text-white focus:ring-[#01C8A9] focus:border-[#01C8A9]">
                <SelectValue placeholder="Select year" />
              </SelectTrigger>
              <SelectContent className="bg-[#051b37] border-[#112F59] text-white">
                <SelectGroup>
                  {yearOptions.map((year) => (
                    <SelectItem key={year} value={year}>
                      {year}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          )}
        </div>

        <Button
          variant="outline"
          size="sm"
          className="ml-auto sm:ml-0 bg-[#051b37] border-[#112F59] text-white hover:bg-[#071f3d]"
        >
          <Calendar className="mr-2 h-4 w-4" />
          Custom Range
        </Button>
      </div>
    </div>
  );
};

export default DashboardHeader;
