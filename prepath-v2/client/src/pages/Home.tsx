import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/useToast';

export function Home() {
  const { toast } = useToast();
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-background to-secondary p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle>Welcome to PrepPath</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-lg">
              {isAuthenticated ? 'Access your personalized dashboard and start preparing for your exams.' : 'Please log in or register to access your personalized dashboard.'}
            </p>
            <div className="flex justify-center space-x-4">
              <Button as={Link} to="/upload" className="w-full">
                Upload PDFs
              </Button>
              <Button as={Link} to="/study-plan" className="w-full">
                View Study Plan
              </Button>
              <Button as={Link} to="/flashcards" className="w-full">
                Flashcards
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}