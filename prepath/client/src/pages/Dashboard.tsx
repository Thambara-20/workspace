import { useEffect, useState } from "react";
import { getPdfs, deletePdf } from "@/api/pdfs";
import { getStudyPlan, generateStudyPlan } from "@/api/studyPlan";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionItem } from "@/components/ui/accordion";
import { useToast } from "@/hooks/useToast";
import { useNavigate } from "react-router-dom";
import { Trash, RefreshCw } from "lucide-react";
import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogTitle, AlertDialogDescription, AlertDialogAction, AlertDialogCancel } from "@/components/ui/alert-dialog";

export function Dashboard() {
  const [pdfs, setPdfs] = useState<any[]>([]);
  const [studyPlan, setStudyPlan] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    fetchPdfs();
    fetchStudyPlan();
  }, []);

  const fetchPdfs = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getPdfs();
      setPdfs(data.pdfs);
    } catch (error) {
      setError(error?.message || "Failed to fetch PDFs");
    } finally {
      setLoading(false);
    }
  };

  const fetchStudyPlan = async () => {
    try {
      const data = await getStudyPlan();
      setStudyPlan(data.studyPlan);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error?.message,
      });
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deletePdf(id);
      setPdfs((prevPdfs) => prevPdfs.filter((pdf) => pdf._id !== id));
      toast({
        title: "Success",
        description: "PDF deleted successfully",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error?.message,
      });
    }
  };

  const handleUploadPDFs = () => {
    // Logic to open file picker and handle file uploads
  };

  const handleGenerateStudyPlan = async () => {
    try {
      setLoading(true);
      const data = await generateStudyPlan({
        pdfs,
        studyDetails: { examDate: "2025-03-10", subjects: ["Math", "Science"], dailyStudyTime: 2 },
      });
      setStudyPlan(data.studyPlan);
      toast({
        title: "Success",
        description: "Study plan generated successfully",
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

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-background to-secondary p-4">
      <Card className="w-full max-w-2xl mb-4">
        <CardHeader className="flex justify-between items-center">
          <CardTitle>Your Uploaded PDFs</CardTitle>
          <Button variant="ghost" size="icon" onClick={fetchPdfs}>
            <RefreshCw className="h-5 w-5" />
          </Button>
        </CardHeader>
        <CardContent>
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <div>
              <p className="text-red-500">{error}</p>
              <Button onClick={fetchPdfs}>Retry</Button>
            </div>
          ) : pdfs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 overflow-y-auto max-h-96">
              {pdfs.map((pdf) => (
                <div key={pdf._id} className="p-4 shadow-md rounded-lg bg-white">
                  <h3 className="font-bold truncate">{pdf.filename}</h3>
                  <p>{new Date(pdf.uploadDate).toLocaleDateString()}</p>
                  <p>{(pdf.fileSize / 1024).toFixed(2)} KB</p>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="ghost" size="icon" className="hover:bg-red-500">
                        <Trash className="h-5 w-5" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogTitle>Are you sure you want to delete this file?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone.
                      </AlertDialogDescription>
                      <AlertDialogAction onClick={() => handleDelete(pdf._id)}>Delete</AlertDialogAction>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-64 bg-gray-100 rounded-lg">
              <p>No PDFs uploaded yet.</p>
              <Button onClick={handleUploadPDFs} className="mt-4 border-dashed border-2 border-gray-300 p-4">
                📂 Upload PDFs
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      <Card className="w-full max-w-2xl">
        <CardHeader className="flex justify-between items-center">
          <CardTitle>Your Study Plan</CardTitle>
          <Button onClick={handleGenerateStudyPlan} className="bg-blue-500 hover:bg-blue-600 text-white">
            Regenerate Study Plan
          </Button>
        </CardHeader>
        <CardContent>
          {studyPlan.length > 0 ? (
            <Accordion>
              {studyPlan.map((session, index) => (
                <AccordionItem key={index}>
                  <div className="flex justify-between w-full">
                    <span>{session.date}</span>
                    <span>{session.duration}</span>
                  </div>
                  <ul>
                    {session.topics.map((topic, idx) => (
                      <li key={idx}>{topic}</li>
                    ))}
                  </ul>
                </AccordionItem>
              ))}
            </Accordion>
          ) : (
            <div className="flex flex-col items-center justify-center h-64 bg-gray-100 rounded-lg">
              <p>No study plan generated yet.</p>
              <Button onClick={handleGenerateStudyPlan} className="mt-4 bg-blue-500 hover:bg-blue-600 text-white p-4">
                Generate Study Plan
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}