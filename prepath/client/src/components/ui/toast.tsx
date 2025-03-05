import { useEffect } from "react";
import { cn } from "@/lib/utils";

export interface ToastProps {
  title: string;
  description: string;
  variant?: string;
}

export function Toast({ title, description, variant }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      // Remove toast after 3 seconds
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={cn(
        "p-4 rounded-md shadow-md",
        variant === "destructive" ? "bg-red-500 text-white" : "bg-green-500 text-white"
      )}
    >
      <h4 className="font-bold">{title}</h4>
      <p>{description}</p>
    </div>
  );
}