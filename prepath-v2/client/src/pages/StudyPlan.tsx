import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  getStudyPlan,
  updateStudySession,
  regenerateStudyPlan,
} from "@/api/studyPlan";
import {
  getFlashcards,
  updateFlashcardStatus,
  generateFlashcards,
} from "@/api/flashcards";
import { useToast } from "@/hooks/useToast";
import { motion } from "framer-motion";

export function StudyPlan() {
  const [studyPlan, setStudyPlan] = useState([]);
  const [loading, setLoading] = useState(false);
  const [flashcards, setFlashcards] = useState([]);
  const [currentFlashcardIndex, setCurrentFlashcardIndex] = useState(0);
  const [flippedCards, setFlippedCards] = useState({});
  const [expandedSession, setExpandedSession] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const fetchStudyPlan = async () => {
      try {
        setLoading(true);
        const data = await getStudyPlan();
        setStudyPlan(data.plan);
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Error",
          description: error?.message,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchStudyPlan();
  }, [toast]);

  const handleCompletionToggle = async (index: number) => {
    try {
      const updatedPlan = [...studyPlan];
      updatedPlan[index].completed = !updatedPlan[index].completed;
      setStudyPlan(updatedPlan);
      await updateStudySession(
        updatedPlan[index].name,
        updatedPlan[index].completed
      );
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error?.message,
      });
    }
  };

  const handleRegeneratePlan = async () => {
    try {
      setLoading(true);
      await regenerateStudyPlan();
      const data = await getStudyPlan();
      setStudyPlan(data.plan);
      toast({
        title: "Success",
        description: "Study plan regenerated successfully",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error?.message,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleShowFlashcards = async (sessionId: string) => {
    try {
      setLoading(true);
      if (expandedSession === sessionId) {
        setExpandedSession(null);
        setFlashcards([]);
      } else {
        const data = await getFlashcards(sessionId);
        setFlashcards(data.flashcards);
        setExpandedSession(sessionId);
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error?.message,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateFlashcards = async (sessionId: string) => {
    try {
      setLoading(true);
      await generateFlashcards(sessionId);
      const data = await getFlashcards(sessionId);
      setFlashcards(data.flashcards);
      setExpandedSession(sessionId);
      toast({
        title: "Success",
        description: "Flashcards generated successfully",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error?.message,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleFlip = async (cardId: number) => {
    setFlippedCards((prev) => ({ ...prev, [cardId]: !prev[cardId] }));

    try {
      const currentFlashcard = flashcards[cardId];
      await updateFlashcardStatus(currentFlashcard.question, true);
      setCurrentFlashcardIndex(
        (prevIndex) => (prevIndex + 1) % flashcards.length
      );
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error?.message,
      });
    }
  };

  const handleShuffle = () => {
    setFlashcards((prevFlashcards) => {
      const shuffled = [...prevFlashcards].sort(() => Math.random() - 0.5);
      return shuffled;
    });
    setCurrentFlashcardIndex(0);
    setFlippedCards({});
  };

  const completedSessions = studyPlan.filter(
    (session) => session.completed
  ).length;
  const studyPlanProgress = (completedSessions / studyPlan.length) * 100;

  return (
    <div className="min-h-screen flex flex-col items-start justify-center bg-gradient-to-br from-background to-secondary p-4">
      <div className="w-full max-w-2xl mb-6 flex-start">
        <h1 className="text-2xl font-bold text-gray-700">Your Study Plan</h1>
        <p className="text-gray-600">
          Track your progress and complete study sessions efficiently.
        </p>
        <Progress
          value={studyPlanProgress}
          className="w-full bg-gray-300 rounded-full overflow-hidden mt-2"
        />
        <p className="text-xl font-semibold text-gray-700 mt-2">
          {studyPlanProgress.toFixed(0)}% Completed
        </p>
      </div>
      <div className="flex flex-col w-full max-w-7xl space-y-4">
        {studyPlan.map((session, index) => (
          <motion.div
            key={index}
            className="bg-white shadow-lg rounded-lg p-4"
            whileHover={{ scale: 1.05 }}
            onTouchStart={() => handleCompletionToggle(index)}
          >
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-gray-700">
                {session.name}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-500">{session.duration}</p>
              <p className="text-gray-600">{session.description}</p>
              <div className="flex items-center mt-2">
                <input
                  type="checkbox"
                  className="w-5 h-5 accent-green-500"
                  checked={session.completed}
                  onChange={() => handleCompletionToggle(index)}
                />
                <span className="ml-2 text-gray-700">Mark as Complete</span>
              </div>
              <Button
                className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded mt-4"
                onClick={() => handleShowFlashcards(session.name)}
              >
                {expandedSession === session.name
                  ? "Hide Flashcards"
                  : "Show Flashcards"}
              </Button>
              {expandedSession === session.name && (
                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {flashcards.map((flashcard, idx) => (
                    <motion.div
                      key={idx}
                      className="relative w-80 h-48 bg-white shadow-md rounded-lg flex items-center justify-center text-center cursor-pointer"
                      onClick={() => handleFlip(idx)}
                      animate={{ rotateY: flippedCards[idx] ? 180 : 0 }}
                      transition={{ duration: 0.6 }}
                    >
                      <div className="p-6">
                        {flippedCards[idx] ? (
                          <p
                            className="text-gray-700"
                            style={{ transform: "rotateY(180deg)" }}
                          >
                            {flashcard.answer}
                          </p> //reverse the text
                        ) : (
                          <p className="font-semibold">{flashcard.question}</p>
                        )}
                      </div>
                    </motion.div>
                  ))}
                  <Button
                    className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded mt-4"
                    onClick={handleShuffle}
                  >
                    Shuffle Flashcards
                  </Button>
                  <p className="text-gray-600 mt-4">
                    You have learned {currentFlashcardIndex} out of{" "}
                    {flashcards.length} flashcards
                  </p>
                </div>
              )}
            </CardContent>
          </motion.div>
        ))}
      </div>
      <Button
        className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded mt-6"
        onClick={handleRegeneratePlan}
        disabled={loading}
      >
        {loading ? "Regenerating..." : "Regenerate Study Plan"}
      </Button>
    </div>
  );
}