import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDropzone } from "react-dropzone";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/useToast";
import { uploadPDFs } from "@/api/pdf";
import { getUploadedPDFs } from "@/api/pdfs";

type UploadForm = {
  files: FileList;
};

export function UploadMaterials() {
  const [loading, setLoading] = useState(false);
  type Pdf = {
    filename: string;
    uploadDate: string;
    size: string;
  };

  const [pdfs, setPdfs] = useState<Pdf[]>([]);
  const { toast } = useToast();
  const { register, handleSubmit } = useForm<UploadForm>();

  const onDrop = (acceptedFiles: File[]) => {
    const fileList = new DataTransfer();
    acceptedFiles.forEach((file) => fileList.items.add(file));
    onSubmit({ files: fileList.files });
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "application/pdf": [] },
    multiple: true,
  });

  const onSubmit = async (data: UploadForm) => {
    try {
      setLoading(true);
      await uploadPDFs(data.files);
      toast({
        title: "Success",
        description: "PDFs uploaded successfully",
      });
      fetchPDFs();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: (error as any)?.message,
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchPDFs = async () => {
    try {
      const pdfData = await getUploadedPDFs();
      setPdfs((pdfData as { pdfs: Pdf[] }).pdfs);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: (error as any)?.message,
      });
    }
  };

  useEffect(() => {
    fetchPDFs();
  }, []);

  return (
    <div className="min-h-screen flex-col items-center justify-center content-center bg-gradient-to-br from-background to-secondary p-4">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-gray-700">
          Upload Your Study Materials
        </CardTitle>
        <p className="text-gray-600">
          Drag and drop your PDFs or select files manually.
        </p>
      </CardHeader>
      <CardContent>
        <div
          {...getRootProps()}
          className={`py-8 border-dashed border-2 border-gray-300 p-6 ${
            isDragActive ? "bg-gray-100" : ""
          }`}
        >
          <input {...getInputProps()} />
          <p className="text-center text-gray-600">
            Drag 'n' drop some files here, or click to select files
          </p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-4">
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Uploading..." : "Upload"}
          </Button>
        </form>
        <div className="mt-6">
          <h2 className="text-lg font-semibold text-gray-700">Uploaded PDFs</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            {pdfs.map((pdf, index) => (
              <div
                key={index}
                className="bg-white shadow-md rounded-lg p-4 flex flex-col items-center hover:shadow-lg transition-all duration-200"
              >
                <p className="truncate text-gray-700 font-semibold text-center">
                  {pdf.filename}
                </p>
                <p className="text-sm text-gray-500 text-center">
                  {pdf.uploadDate}
                </p>
                <p className="text-xs text-gray-400 text-center">
                  Size: {pdf.size}
                </p>
                <div className="flex justify-between w-full mt-2">
                  <Button className="bg-blue-500 hover:bg-blue-600 text-white rounded-md px-4 py-2">
                    View
                  </Button>
                  <Button className="bg-red-500 hover:bg-red-600 text-white rounded-md px-4 py-2">
                    Delete
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </div>
  );
}