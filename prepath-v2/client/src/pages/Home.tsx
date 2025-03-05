import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/useToast';
import { getStudyPlan } from '@/api/studyPlan';
import { getUploadedPDFs } from '@/api/pdfs';
import { getFlashcards } from '@/api/flashcards';
import { Progress } from '@/components/ui/progress';

export function Home() {
  const { toast } = useToast();
  const { isAuthenticated } = useAuth();
  const [studyPlan, setStudyPlan] = useState([]);
  const [pdfs, setPdfs] = useState([]);
  const [flashcards, setFlashcards] = useState([]);
  const [completedSessions, setCompletedSessions] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const studyPlanData = await getStudyPlan();
        setStudyPlan(studyPlanData.plan);
        setCompletedSessions(2); // Mocked completed sessions

        const pdfData = await getUploadedPDFs();
        setPdfs(pdfData.pdfs);

        const flashcardData = await getFlashcards();
        setFlashcards(flashcardData.flashcards);
      } catch (error) {
        toast({
          variant: 'destructive',
          title: 'Error',
          description: error?.message,
        });
      }
    };

    fetchData();
  }, [toast]);

  const studyPlanProgress = (completedSessions / studyPlan.length) * 100;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-background to-secondary p-6">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800">Welcome to PrepPath</h1>
        <p className="text-lg text-gray-600 mt-2">Your AI-powered learning platform for efficient exam preparation.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-7xl">
        <Card className="bg-white shadow-lg rounded-lg p-4">
          <CardHeader>
            <CardTitle>Study Plan Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <Progress value={studyPlanProgress} className="w-full bg-gray-300 rounded-full overflow-hidden" />
            <p className="text-xl font-semibold text-gray-700 mt-2">{studyPlanProgress.toFixed(0)}% Completed</p>
            <Button as={Link} to="/study-plan" className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded mt-4">
              View Study Plan
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-white shadow-lg rounded-lg p-4">
          <CardHeader>
            <CardTitle>Uploaded PDFs</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {pdfs.map((pdf, index) => (
                <li key={index} className="flex justify-between items-center">
                  <div>
                    <p className="truncate text-gray-700">{pdf.filename}</p>
                    <p className="text-sm text-gray-500">{pdf.uploadDate}</p>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="link" className="text-blue-500">View</Button>
                    <Button variant="link" className="text-red-500">Delete</Button>
                  </div>
                </li>
              ))}
            </ul>
            <Button as={Link} to="/upload" className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded mt-4">
              Upload New PDF
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-white shadow-lg rounded-lg p-4">
          <CardHeader>
            <CardTitle>Flashcards Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xl font-semibold">{flashcards.length} Flashcards Generated</p>
            <p className="text-sm text-gray-500">Reviewed: 3 / Remaining: {flashcards.length - 3}</p>
            <Button as={Link} to="/flashcards" className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded mt-4">
              Go to Flashcards
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}