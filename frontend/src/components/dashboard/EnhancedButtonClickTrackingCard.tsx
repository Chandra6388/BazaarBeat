
import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, TooltipProps } from "recharts";
import { NameType, ValueType } from "recharts/types/component/DefaultTooltipContent";

interface EnhancedButtonClickTrackingCardProps {
  timePeriod?: string;
}

const EnhancedButtonClickTrackingCard: React.FC<EnhancedButtonClickTrackingCardProps> = ({ 
  timePeriod = "week" 
}) => {
  // Data for different time periods
  const chartData = {
    day: [
      { name: "12 AM", Contact: 4, LinkedIn: 2, Website: 1 },
      { name: "6 AM", Contact: 5, LinkedIn: 3, Website: 2 },
      { name: "12 PM", Contact: 12, LinkedIn: 8, Website: 5 },
      { name: "6 PM", Contact: 9, LinkedIn: 5, Website: 3 },
      { name: "11 PM", Contact: 7, LinkedIn: 4, Website: 2 },
    ],
    week: [
      { name: "Mon", Contact: 24, LinkedIn: 13, Website: 8 },
      { name: "Tue", Contact: 28, LinkedIn: 15, Website: 10 },
      { name: "Wed", Contact: 36, LinkedIn: 21, Website: 14 },
      { name: "Thu", Contact: 32, LinkedIn: 18, Website: 12 },
      { name: "Fri", Contact: 30, LinkedIn: 16, Website: 10 },
      { name: "Sat", Contact: 18, LinkedIn: 9, Website: 6 },
      { name: "Sun", Contact: 12, LinkedIn: 5, Website: 3 },
    ],
    month: [
      { name: "Week 1", Contact: 120, LinkedIn: 85, Website: 45 },
      { name: "Week 2", Contact: 148, LinkedIn: 105, Website: 62 },
      { name: "Week 3", Contact: 156, LinkedIn: 110, Website: 65 },
      { name: "Week 4", Contact: 142, LinkedIn: 95, Website: 55 },
    ],
  };

  // Get the correct data based on time period
  const data = chartData[timePeriod as keyof typeof chartData] || chartData.week;

  const CustomTooltip = ({
    active,
    payload,
    label,
  }: TooltipProps<ValueType, NameType>) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-[#031123] border border-[#112F59] p-3 rounded shadow-lg">
          <p className="text-white font-medium">{`${label}`}</p>
          <div className="space-y-1 mt-1">
            {payload.map((entry, index) => (
              <div key={index} className="flex items-center gap-2">
                <div
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: entry.color }}
                />
                <p className="text-xs text-gray-300">
                  {`${entry.name}: ${entry.value}`}
                </p>
              </div>
            ))}
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-[#031123] border border-[#112F59] rounded-lg p-4 overflow-hidden">
      <div className="mb-4">
        <h3 className="text-white text-lg font-medium">Button Click Tracking</h3>
        <p className="text-gray-400 text-sm">
          Track which buttons in your signature get the most clicks
        </p>
      </div>

      <div className="flex flex-wrap gap-4 mb-4">
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-full bg-[#01C8A9]" />
          <span className="text-xs text-gray-400">Contact</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-full bg-[#3B82F6]" />
          <span className="text-xs text-gray-400">LinkedIn</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-full bg-[#F59E0B]" />
          <span className="text-xs text-gray-400">Website</span>
        </div>
      </div>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{ top: 0, right: 10, left: -25, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#112F59" />
            <XAxis dataKey="name" tick={{ fill: "#8793A3" }} />
            <YAxis tick={{ fill: "#8793A3" }} />
            <Tooltip content={<CustomTooltip />} />
            <Line
              type="monotone"
              dataKey="Contact"
              stroke="#01C8A9"
              activeDot={{ r: 6 }}
              strokeWidth={2}
            />
            <Line
              type="monotone"
              dataKey="LinkedIn"
              stroke="#3B82F6"
              activeDot={{ r: 6 }}
              strokeWidth={2}
            />
            <Line
              type="monotone"
              dataKey="Website"
              stroke="#F59E0B"
              activeDot={{ r: 6 }}
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default EnhancedButtonClickTrackingCard;
