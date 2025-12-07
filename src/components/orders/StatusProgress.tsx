import { Check } from "lucide-react";

interface StatusProgressProps {
  status: string;
}

const StatusProgress = ({ status }: StatusProgressProps) => {
  const steps = ["Ordered", "Processing", "Paid", "Shipped", "Delivered", "Canceled"];
  
  const getStepIndex = (currentStatus: string) => {
    const statusMap: Record<string, number> = {
      "pending": 0,
      "processing": 1,
      "paid": 2,
      "shipped": 3,
      "delivered": 4,
      "canceled": 5,
    };
    return statusMap[currentStatus] ?? 0;
  };

  const currentStep = getStepIndex(status);

  return (
    <div className="relative">
      <div className="flex justify-between items-center">
        {steps.map((step, index) => (
          <div key={step} className="flex flex-col items-center flex-1">
            <div 
              className={`w-10 h-10 rounded-full flex items-center justify-center transition-smooth ${
                index <= currentStep 
                  ? "bg-foreground text-background" 
                  : "bg-muted text-neutral-400 "
              }`}
            >
              {index <= currentStep ? (
                <Check className="h-5 w-5" />
              ) : (
                <span className="text-sm font-medium">{index + 1}</span>
              )}
            </div>
            <span className={`text-xs mt-2 ${
              index <= currentStep ? "text-foreground font-medium" : "text-neutral-400 "
            }`}>
              {step}
            </span>
          </div>
        ))}
      </div>
      
      {/* Progress Line */}
      <div className="absolute top-5 left-0 right-0 h-0.5 bg-muted -z-10 mx-12">
        <div 
          className="h-full bg-foreground transition-all duration-500"
          style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
        />
      </div>
    </div>
  );
};

export default StatusProgress;
