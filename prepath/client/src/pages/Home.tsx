import { useEffect, useState } from "react";
import { getDashboardData } from "@/api/dashboard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/useToast";

export function Home() {
  const [dashboardData, setDashboardData] = useState<any>(null);
  const { toast } = useToast();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getDashboardData();
        setDashboardData(data);
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
          <CardTitle>Dashboard</CardTitle>
        </CardHeader>
        <CardContent>
          {dashboardData ? (
            <>
              <div className="mb-4">
                <h2 className="text-lg font-bold">Uploaded PDFs</h2>
                <ul>
                  {dashboardData.pdfs.map((pdf: any) => (
                    <li key={pdf._id}>{pdf.filename}</li>
                  ))}
                </ul>
              </div>
              <div className="mb-4">
                <h2 className="text-lg font-bold">Study Plan</h2>
                <p>{dashboardData.studyPlan}</p>
              </div>
              <div>
                <h2 className="text-lg font-bold">Flashcards</h2>
                <ul>
                  {dashboardData.flashcards.map((flashcard: any, index: number) => (
                    <li key={index}>
                      <strong>Q:</strong> {flashcard.question} <br />
                      <strong>A:</strong> {flashcard.answer}
                    </li>
                  ))}
                </ul>
              </div>
            </>
          ) : (
            <p>Loading...</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}