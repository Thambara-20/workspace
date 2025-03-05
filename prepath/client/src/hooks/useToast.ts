import { useCallback } from "react";
import { useToaster } from "@/components/ui/toaster";

export function useToast() {
  const { addToast } = useToaster();

  const toast = useCallback(
    ({ title, description, variant }: { title: string; description: string; variant?: string }) => {
      addToast({
        title,
        description,
        variant,
      });
    },
    [addToast]
  );

  return { toast };
}