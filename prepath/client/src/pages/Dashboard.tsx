import { useEffect, useState } from "react";
import { getPdfs, deletePdf } from "@/api/pdfs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/useToast";
import { useNavigate } from "react-router-dom";
import { Trash, RefreshCw } from "lucide-react";
import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader, AlertDialogFooter, AlertDialogTitle, AlertDialogDescription, AlertDialogAction, AlertDialogCancel } from "@/components/ui/alert-dialog";

export function Dashboard() {
  const [pdfs, setPdfs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    fetchPdfs();
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

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-background to-secondary p-4">
      <Card className="w-full max-w-2xl">
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
                      <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure you want to delete this file?</AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={() => handleDelete(pdf._id)}>Delete</AlertDialogAction>
                      </AlertDialogFooter>
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
    </div>
  );
}