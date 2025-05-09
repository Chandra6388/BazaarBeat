
import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";

interface EnhancedSignatureOverviewCardProps {
  timePeriod?: string;
}

const EnhancedSignatureOverviewCard: React.FC<EnhancedSignatureOverviewCardProps> = ({
  timePeriod = "week"
}) => {
  // Data for different time periods
  const chartData = {
    day: [
      { name: "Work Email", value: 35 },
      { name: "Personal Email", value: 15 },
      { name: "Marketing", value: 10 },
      { name: "Social Media", value: 5 },
    ],
    week: [
      { name: "Work Email", value: 45 },
      { name: "Personal Email", value: 20 },
      { name: "Marketing", value: 25 },
      { name: "Social Media", value: 10 },
    ],
    month: [
      { name: "Work Email", value: 50 },
      { name: "Personal Email", value: 22 },
      { name: "Marketing", value: 30 },
      { name: "Social Media", value: 18 },
    ],
  };

  // Get the correct data based on time period
  const data = chartData[timePeriod as keyof typeof chartData] || chartData.week;

  const colors = ["#01C8A9", "#3B82F6", "#F59E0B", "#8B5CF6"];

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-[#031123] border border-[#112F59] p-3 rounded shadow-lg">
          <p className="text-white font-medium">{`${payload[0].name}`}</p>
          <p className="text-[#01C8A9] text-sm">{`${payload[0].value} signatures (${((payload[0].value / data.reduce((a, b) => a + b.value, 0)) * 100).toFixed(1)}%)`}</p>
        </div>
      );
    }
    return null;
  };

  const CustomLegend = ({ payload }: any) => {
    return (
      <ul className="flex flex-wrap gap-x-4 gap-y-2 mt-4 justify-center">
        {payload.map((entry: any, index: number) => (
          <li key={`item-${index}`} className="flex items-center gap-1.5">
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: entry.color }}
            />
            <span className="text-xs text-gray-400">{entry.value}</span>
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className="bg-[#031123] border border-[#112F59] rounded-lg p-4">
      <div className="mb-4">
        <h3 className="text-white text-lg font-medium">Signature Overview</h3>
        <p className="text-gray-400 text-sm">
          Distribution of your signatures by type
        </p>
      </div>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={80}
              innerRadius={40}
              fill="#8884d8"
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend content={<CustomLegend />} />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 pt-4 border-t border-[#112F59]">
        <div className="flex justify-between text-sm">
          <span className="text-gray-400">Total Signatures</span>
          <span className="text-white font-medium">
            {data.reduce((sum, item) => sum + item.value, 0)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default EnhancedSignatureOverviewCard;
