import { Check } from "lucide-react";

interface StatusProgressProps {
  status: string;
}

const StatusProgress = ({ status }: StatusProgressProps) => {
  const isReturnFlow = ["return_requested", "return_approved", "returned"].includes(status.toLowerCase());

  const steps = isReturnFlow
    ? ["Return Requested", "Return Approved", "Returned"]
    : status === "canceled"
    ? ["Ordered", "Canceled"]
    : ["Ordered", "Processing", "Shipping", "Delivered"];

  const getStepIndex = (currentStatus: string) => {
    const statusMap: Record<string, number> = {
      ordered: 0,
      processing: 1,
      shipping: 2,
      delivered: 3,
      canceled: 1,
      // return flow mapping
      return_requested: 0,
      return_approved: 1,
      returned: 2,
    };
    return statusMap[currentStatus] ?? 0;
  };

  const currentStep = getStepIndex(status);

  return (
    <div className="relative">
      <div className="flex justify-between items-center">
        {steps.map((step, index) => {
          const isCompleted = index <= currentStep;
          const isCanceledStep = status === "canceled" && index === currentStep;
          const circleClass = isCompleted
            ? isCanceledStep
              ? "bg-red-600 text-white"
              : "bg-foreground text-background"
            : "bg-muted text-neutral-400";

          const labelClass = isCompleted
            ? isCanceledStep
              ? "text-red-600 font-medium"
              : "text-foreground font-medium"
            : "text-neutral-400";

          return (
            <div key={step} className="flex flex-col items-center flex-1">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-smooth ${circleClass}`}>
                {index <= currentStep ? (
                  <Check className="h-5 w-5" />
                ) : (
                  <span className="text-sm font-medium">{index + 1}</span>
                )}
              </div>
              <span className={`text-xs mt-2 ${labelClass}`}>
                {step}
              </span>
            </div>
          );
        })}
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
