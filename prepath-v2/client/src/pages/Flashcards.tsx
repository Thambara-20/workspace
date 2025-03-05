import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { getFlashcards, updateFlashcardStatus, getFlashcardsProgress } from '@/api/flashcards';
import { useToast } from '@/hooks/useToast';
import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';

export function Flashcards() {
  const [flashcards, setFlashcards] = useState([]);
  const [flippedCards, setFlippedCards] = useState({});
  const [viewedCards, setViewedCards] = useState({});
  const [progress, setProgress] = useState({ learnedCount: 0, totalCount: 0 });
  const { toast } = useToast();

  useEffect(() => {
    const fetchFlashcards = async () => {
      try {
        const data = await getFlashcards();
        setFlashcards(data.flashcards);
        const progressData = await getFlashcardsProgress();
        setProgress(progressData);
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

  const handleFlip = async (cardId) => {
    setFlippedCards((prev) => ({ ...prev, [cardId]: !prev[cardId] }));
    setViewedCards((prev) => ({ ...prev, [cardId]: true }));

    try {
      await updateFlashcardStatus(cardId, true);
      setProgress((prev) => ({ ...prev, learnedCount: prev.learnedCount + 1 }));
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: error?.message,
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center gap-6 p-6 bg-gradient-to-br from-background to-secondary">
      <h1 className="text-2xl font-bold text-gray-700">Your Flashcards</h1>
      <p className="text-gray-600">Test your knowledge with AI-generated flashcards.</p>
      <div className="flex flex-col items-center">
        {flashcards.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {flashcards.map((card, index) => (
              <motion.div
                key={index}
                className={`flashcard ${flippedCards[index] ? "flipped" : ""} ${viewedCards[index] ? "bg-blue-100" : "bg-white"} ${card.learned ? "bg-green-200" : ""}`}
                onClick={() => handleFlip(index)}
                style={{
                  transformStyle: 'preserve-3d',
                  width: '280px',
                  height: '150px',
                  position: 'relative',
                  transition: 'transform 0.6s, background-color 0.6s',
                }}
              >
                <div className="flashcard-front" style={{ backfaceVisibility: 'hidden', position: 'absolute', width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '10px', textAlign: 'center', fontSize: '16px' }}>
                  <p className="text-lg font-semibold">{card.question}</p>
                </div>
                <div className="flashcard-back" style={{ transform: 'rotateY(180deg)', backfaceVisibility: 'hidden', position: 'absolute', width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f0f0f0', padding: '10px', textAlign: 'center', fontSize: '16px' }}>
                  <p className="text-gray-600">{card.answer}</p>
                  {card.learned && (
                    <CheckCircle className="text-green-600 w-6 h-6" />
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        )}
        <p className="text-gray-600 mt-4">
          You have learned {progress.learnedCount} out of {progress.totalCount} flashcards
        </p>
      </div>
    </div>
  );
}