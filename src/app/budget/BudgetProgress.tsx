import { useTheme } from 'next-themes';
import React, { useEffect, useState } from 'react';

export default function BudgetProgress({ percentage }: { percentage: number }) {
    const { theme } = useTheme();

    useEffect(() => {
        const animation = setTimeout(() => setAnimatedPercentage(percentage), 500);
        return () => clearTimeout(animation);
    }, [percentage]);

    const [animatedPercentage, setAnimatedPercentage] = useState(0);
    const radius = 50; 
    const circumference = 2 * Math.PI * radius;

    const strokeDashoffset = circumference - (animatedPercentage / 100) * circumference;

    return (
        <div id="budgetProgressGraph" className="h-80">
            <svg className="w-full h-full" viewBox="0 0 120 120">
                <defs>
                    <linearGradient id="progress-gradient" x1="1" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#4caf50" />
                        <stop offset="100%" stopColor="#1e8e3e" />
                    </linearGradient>
                </defs>
                <circle
                    cx="60"
                    cy="60"
                    r={radius}
                    stroke="lightgray"
                    strokeWidth="10"
                    fill="none"
                />
                <circle
                    cx="60"
                    cy="60"
                    r={radius}
                    stroke="url(#progress-gradient)"
                    strokeWidth="10"
                    fill="none"
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                    strokeLinecap="round"
                    style={{
                        transition: 'stroke-dashoffset 1s ease',
                        transform: 'rotate(-90deg)',
                        transformOrigin: 'center center',
                    }}
                />
                <text
                    x="50%"
                    y="50%"
                    textAnchor="middle"
                    fill={theme == 'light' ? '#000' : '#fff'}
                    dy=".3em"
                    fontSize="20"
                    fontWeight="bold"
                >
                    {`${Math.round(animatedPercentage)}%`}
                </text>
            </svg>
        </div>
    );
}
