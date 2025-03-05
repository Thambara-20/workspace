import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/useToast';
import { uploadPDFs } from '@/api/pdf';

type UploadForm = {
  files: FileList;
};

export function Upload() {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const { register, handleSubmit } = useForm<UploadForm>();

  const onSubmit = async (data: UploadForm) => {
    try {
      setLoading(true);
      await uploadPDFs(data.files);
      toast({
        title: 'Success',
        description: 'PDFs uploaded successfully',
      });
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

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-secondary p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Upload PDFs</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="files">Select PDFs</Label>
              <Input
                id="files"
                type="file"
                multiple
                {...register('files', { required: true })}
              />
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? 'Uploading...' : 'Upload'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}