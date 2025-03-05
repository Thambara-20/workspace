import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getStudyPlan } from '@/api/studyPlan';
import { useToast } from '@/hooks/useToast';

export function StudyPlan() {
  const [studyPlan, setStudyPlan] = useState([]);
  const { toast } = useToast();

  useEffect(() => {
    const fetchStudyPlan = async () => {
      try {
        const data = await getStudyPlan();
        setStudyPlan(data.plan);
      } catch (error) {
        toast({
          variant: 'destructive',
          title: 'Error',
          description: error?.message,
        });
      }
    };

    fetchStudyPlan();
  }, [toast]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-secondary p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle>Study Plan</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {studyPlan.map((session, index) => (
              <li key={index} className="p-2 border rounded">
                {session}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}