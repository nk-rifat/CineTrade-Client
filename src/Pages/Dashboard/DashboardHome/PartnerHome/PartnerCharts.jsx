import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

export const ChartCard = ({ title, subtitle, children, glow }) => (
  <div
    style={{
      boxShadow: `0 20px 50px -20px ${glow}`,
      background:
        "linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.01) 100%)",
    }}
    className="backdrop-blur-xl border border-white/10 p-8 rounded-4xl transition-all duration-500 hover:border-white/20"
  >
    <div className="flex flex-col gap-1 mb-8">
      <h2 className="text-xl font-bold tracking-tight text-slate-100">
        {title}
      </h2>
      <p className="text-slate-500 text-xs font-medium uppercase tracking-wider">
        {subtitle}
      </p>
    </div>
    <div className="h-75 w-full">{children}</div>
  </div>
);

export const ModernAreaChart = ({ data, color }) => (
  <ResponsiveContainer width="100%" height="100%">
    <AreaChart data={data} margin={{ left: -20, right: 10, top: 10 }}>
      <defs>
        {/* Enhanced Gradient for Glass Effect */}
        <linearGradient id={`g-${color}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity={0.4} />
          <stop offset="100%" stopColor={color} stopOpacity={0} />
        </linearGradient>
      </defs>

      <CartesianGrid
        strokeDasharray="3 3"
        vertical={false}
        stroke="rgba(255,255,255,0.05)"
      />

      <XAxis
        dataKey="month"
        axisLine={false}
        tickLine={false}
        tick={{ fill: "#64748b", fontSize: 11, fontWeight: 500 }}
        dy={15}
      />

      <YAxis
        axisLine={false}
        tickLine={false}
        tick={{ fill: "#64748b", fontSize: 11, fontWeight: 500 }}
      />

      <Tooltip
        cursor={{ stroke: "rgba(255,255,255,0.1)", strokeWidth: 2 }}
        contentStyle={{
          backgroundColor: "rgba(15, 17, 21, 0.9)",
          backdropFilter: "blur(8px)",
          border: "1px solid rgba(255,255,255,0.1)",
          borderRadius: "16px",
          fontSize: "12px",
          boxShadow: "0 10px 15px -3px rgba(0,0,0,0.5)",
        }}
        itemStyle={{ color: color, fontWeight: "bold" }}
      />

      <Area
        type="monotone"
        dataKey="value"
        stroke={color}
        strokeWidth={4}
        fillOpacity={1}
        fill={`url(#g-${color})`}
        // Animation for better UX
        animationBegin={0}
        animationDuration={1500}
        animationEasing="ease-in-out"
      />
    </AreaChart>
  </ResponsiveContainer>
);
