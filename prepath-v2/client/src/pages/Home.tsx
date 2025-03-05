import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/useToast';
import { getHomepageData } from '@/api/homepageData';
import { Progress } from '@/components/ui/progress';

export function Home() {
  const { toast } = useToast();
  const [nextSession, setNextSession] = useState({ subject: '', duration: '' });
  const [studyProgress, setStudyProgress] = useState(0);
  const [recentPDFs, setRecentPDFs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getHomepageData();
        setNextSession(data.nextSession);
        setStudyProgress(data.studyProgress);
        setRecentPDFs(data.recentPDFs);
      } catch (error) {
        toast({
          variant: 'destructive',
          title: 'Error',
          description: error?.message,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [toast]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-background to-secondary p-6">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800">Study Dashboard</h1>
        <p className="text-lg text-gray-600 mt-2">Your personalized study overview.</p>
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">
          <Card className="bg-white shadow-lg rounded-lg p-4">
            <CardHeader>
              <CardTitle>Next Study Session</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xl font-semibold text-gray-700">{nextSession.subject}</p>
              <p className="text-sm text-gray-500">{nextSession.duration}</p>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-lg rounded-lg p-4">
            <CardHeader>
              <CardTitle>Study Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <Progress value={studyProgress} className="w-full bg-gray-300 rounded-full overflow-hidden" />
              <p className="text-xl font-semibold text-gray-700 mt-2">{studyProgress}% Completed</p>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-lg rounded-lg p-4">
            <CardHeader>
              <CardTitle>Recent Study Materials</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {recentPDFs.map((pdf, index) => (
                  <li key={index} className="flex justify-between items-center">
                    <div>
                      <p className="truncate text-gray-700">{pdf.filename}</p>
                      <p className="text-sm text-gray-500">{pdf.uploadDate}</p>
                    </div>
                  </li>
                ))}
              </ul>
              <Button as={Link} to="/study-plan" className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded mt-4">
                View Study Plan
              </Button>
            </CardContent>
          </Card>

          <div className="flex flex-col space-y-4">
            <Button as={Link} to="/study-plan" className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded">
              Go to Study Plan
            </Button>
            <Button as={Link} to="/settings" className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded">
              Settings
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}