
import React from "react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

interface EnhancedSignatureUseCardProps {
  timePeriod?: string;
}

const EnhancedSignatureUseCard: React.FC<EnhancedSignatureUseCardProps> = ({
  timePeriod = "week"
}) => {
  // Data for different time periods
  const chartData = {
    day: [
      { name: "12 AM", usage: 5 },
      { name: "4 AM", usage: 2 },
      { name: "8 AM", usage: 15 },
      { name: "12 PM", usage: 28 },
      { name: "4 PM", usage: 32 },
      { name: "8 PM", usage: 18 },
      { name: "11 PM", usage: 8 },
    ],
    week: [
      { name: "Mon", usage: 65 },
      { name: "Tue", usage: 78 },
      { name: "Wed", usage: 95 },
      { name: "Thu", usage: 87 },
      { name: "Fri", usage: 74 },
      { name: "Sat", usage: 42 },
      { name: "Sun", usage: 35 },
    ],
    month: [
      { name: "Week 1", usage: 320 },
      { name: "Week 2", usage: 380 },
      { name: "Week 3", usage: 410 },
      { name: "Week 4", usage: 375 },
    ],
  };

  // Get the correct data based on time period
  const data = chartData[timePeriod as keyof typeof chartData] || chartData.week;

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-[#031123] border border-[#112F59] p-3 rounded shadow-lg">
          <p className="text-white font-medium">{`${label}`}</p>
          <p className="text-[#01C8A9] text-sm">{`${payload[0].value} uses`}</p>
        </div>
      );
    }
    return null;
  };

  const gradientOffset = () => {
    const dataMax = Math.max(...data.map((i) => i.usage));
    const dataMin = Math.min(...data.map((i) => i.usage));
    
    if (dataMax <= 0) {
      return 0;
    }
    if (dataMin >= 0) {
      return 1;
    }
    
    return dataMax / (dataMax - dataMin);
  };
  
  const off = gradientOffset();

  return (
    <div className="bg-[#031123] border border-[#112F59] rounded-lg p-4">
      <div className="mb-4">
        <h3 className="text-white text-lg font-medium">Signature Usage</h3>
        <p className="text-gray-400 text-sm">
          How often your signatures are being used over time
        </p>
      </div>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorUsage" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#01C8A9" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#01C8A9" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#112F59" vertical={false} />
            <XAxis dataKey="name" tick={{ fill: "#8793A3" }} />
            <YAxis tick={{ fill: "#8793A3" }} />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="usage"
              stroke="#01C8A9"
              fillOpacity={1}
              fill="url(#colorUsage)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 pt-4 border-t border-[#112F59] grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <span className="text-gray-400 text-xs">Average Usage</span>
          <div className="text-white font-medium">
            {Math.round(data.reduce((sum, item) => sum + item.usage, 0) / data.length)}
            <span className="text-xs text-gray-400 ml-1">per {timePeriod === "day" ? "hour" : timePeriod === "week" ? "day" : "week"}</span>
          </div>
        </div>
        <div>
          <span className="text-gray-400 text-xs">Total Usage</span>
          <div className="text-white font-medium">
            {data.reduce((sum, item) => sum + item.usage, 0)}
          </div>
        </div>
        <div>
          <span className="text-gray-400 text-xs">Peak Usage</span>
          <div className="text-white font-medium">
            {Math.max(...data.map(item => item.usage))}
            <span className="text-xs text-gray-400 ml-1">({data.find(item => item.usage === Math.max(...data.map(i => i.usage)))?.name})</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnhancedSignatureUseCard;
