// FlowStep.tsx
import React from 'react';

interface FlowStepProps {
  title: string;
  steps: string[];
}

const FlowStep: React.FC<FlowStepProps> = ({ title, steps }) => {
  return (
    <div className="p-4 bg-slate-700 rounded-lg shadow-md text-white">
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <ul className="space-y-1 text-sm list-disc list-inside">
        {steps.map((step, index) => (
          <li key={index}>{step}</li>
        ))}
      </ul>
    </div>
  );
};

export default FlowStep;
