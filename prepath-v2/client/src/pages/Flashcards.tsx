import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getFlashcards } from '@/api/flashcards';
import { useToast } from '@/hooks/useToast';

export function Flashcards() {
  const [flashcards, setFlashcards] = useState([]);
  const { toast } = useToast();

  useEffect(() => {
    const fetchFlashcards = async () => {
      try {
        const data = await getFlashcards();
        setFlashcards(data.flashcards);
      } catch (error) {
        toast({
          variant: 'destructive',
          title: 'Error',
          description: error?.message,
        });
      }
    };

    fetchFlashcards();
  }, [toast]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-secondary p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle>Flashcards</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {flashcards.map((flashcard, index) => (
              <li key={index} className="p-2 border rounded">
                {flashcard}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}