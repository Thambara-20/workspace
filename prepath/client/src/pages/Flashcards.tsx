import { useEffect, useState } from "react";
import { getFlashcardsData } from "@/api/flashcards";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/useToast";

export function Flashcards() {
  const [flashcards, setFlashcards] = useState<any>([]);
  const { toast } = useToast();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getFlashcardsData();
        setFlashcards(data.flashcards);
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Error",
          description: error?.message,
        });
      }
    };
    fetchData();
  }, [toast]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-background to-secondary p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle>Flashcards</CardTitle>
        </CardHeader>
        <CardContent>
          {flashcards.length > 0 ? (
            <ul>
              {flashcards.map((flashcard: any, index: number) => (
                <li key={index} className="mb-4">
                  <strong>Q:</strong> {flashcard.question} <br />
                  <strong>A:</strong> {flashcard.answer}
                </li>
              ))}
            </ul>
          ) : (
            <p>Loading...</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}