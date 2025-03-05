import { createContext, useContext, useState, ReactNode } from "react";
import { Toast, ToastProps } from "./toast";

type ToasterContextType = {
  addToast: (toast: ToastProps) => void;
};

const ToasterContext = createContext<ToasterContextType | null>(null);

export function ToasterProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastProps[]>([]);

  const addToast = (toast: ToastProps) => {
    setToasts((prevToasts) => [...prevToasts, toast]);
  };

  return (
    <ToasterContext.Provider value={{ addToast }}>
      {children}
      <div className="fixed bottom-0 right-0 p-4 space-y-2">
        {toasts.map((toast, index) => (
          <Toast key={index} {...toast} />
        ))}
      </div>
    </ToasterContext.Provider>
  );
}

export function useToaster() {
  const context = useContext(ToasterContext);
  if (!context) {
    throw new Error("useToaster must be used within a ToasterProvider");
  }
  return context;
}