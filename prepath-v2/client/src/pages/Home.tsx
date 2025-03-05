import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/useToast";
import { getHomepageData } from "@/api/homepageData";
import { Progress } from "@/components/ui/progress";

export function Home() {
  const { toast } = useToast();
  const [nextSession, setNextSession] = useState({
    subject: "No upcoming session",
    duration: "N/A",
  });
  const [studyProgress, setStudyProgress] = useState(0);
  const [recentPDFs, setRecentPDFs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getHomepageData();
        setNextSession(
          data.nextSession || {
            subject: "No upcoming session",
            duration: "N/A",
          }
        );
        setStudyProgress(data.studyProgress || 0);
        setRecentPDFs(data.recentPDFs || []);
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Error",
          description: error?.message || "Failed to load homepage data",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [toast]);

  return (
    <div className="min-h-screen flex flex-col items-center bg-neutral p-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-semibold text-gray-800">
          Welcome to PrepPath
        </h1>
        <p className="text-lg text-gray-600 mt-2">
          Your personalized study dashboard
        </p>
      </div>

      {loading ? (
        <p className="text-gray-600">Loading...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">
          {/* Next Study Session Card */}
          <Card className="bg-white shadow-md rounded-lg p-4">
            <CardHeader>
              <CardTitle>Next Study Session</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg font-medium text-gray-700">
                {nextSession.subject}
              </p>
              <p className="text-sm text-gray-500">{nextSession.duration}</p>
            </CardContent>
          </Card>

          {/* Study Progress Card */}
          <Card className="bg-white shadow-md rounded-lg p-4">
            <CardHeader>
              <CardTitle>Study Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <Progress
                value={studyProgress}
                className="w-full bg-gray-300 rounded-full overflow-hidden"
              />
              <p className="text-lg font-medium text-gray-700 mt-2">
                {studyProgress}% Completed
              </p>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex justify-center w-full col-span-1 md:col-span-2">
            <Link to="/study-plan">
              <Button className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded">
                Go to Study Plan
              </Button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
