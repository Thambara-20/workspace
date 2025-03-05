import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/useToast";
import { submitOnboarding } from "@/api/onboarding";

type OnboardingForm = {
  examDate: string;
  subjects: string;
  dailyStudyTime: number;
  pdfs: FileList;
};

export function Onboarding() {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm<OnboardingForm>();

  const onSubmit = async (data: OnboardingForm) => {
    try {
      setLoading(true);
      const formData = {
        examDate: data.examDate,
        subjects: data.subjects.split(","),
        dailyStudyTime: data.dailyStudyTime,
        pdfs: Array.from(data.pdfs),
      };
      await submitOnboarding(formData);
      toast({
        title: "Success",
        description: "Onboarding completed successfully",
      });
      navigate("/");
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

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-secondary p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Onboarding</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="examDate">Exam Date</Label>
              <Input
                id="examDate"
                type="date"
                {...register("examDate", { required: true })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="subjects">Subjects</Label>
              <Input
                id="subjects"
                type="text"
                placeholder="Enter subjects separated by commas"
                {...register("subjects", { required: true })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="dailyStudyTime">Daily Study Time (hours)</Label>
              <Input
                id="dailyStudyTime"
                type="number"
                placeholder="Enter daily study time"
                {...register("dailyStudyTime", { required: true })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="pdfs">Upload PDFs</Label>
              <Input
                id="pdfs"
                type="file"
                multiple
                {...register("pdfs", { required: true })}
              />
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Loading..." : "Submit"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}