import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/useToast';
import { useDropzone } from 'react-dropzone';
import { submitOnboardingDetails } from '@/api/onboarding';
import { uploadPDFs } from '@/api/pdf';

export function Settings() {
  const [examDate, setExamDate] = useState('');
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);
  const [studyHours, setStudyHours] = useState('');
  const [subjectInput, setSubjectInput] = useState('');
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleAddSubject = () => {
    if (subjectInput && !selectedSubjects.includes(subjectInput)) {
      setSelectedSubjects([...selectedSubjects, subjectInput]);
      setSubjectInput('');
    }
  };

  const handleRemoveSubject = (subject: string) => {
    setSelectedSubjects(selectedSubjects.filter((s) => s !== subject));
  };

  const onDrop = (acceptedFiles: File[]) => {
    setUploadedFiles(acceptedFiles);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'application/pdf': [] },
    multiple: true,
  });

  const handleSubmit = async () => {
    try {
      await submitOnboardingDetails({ examDate, selectedSubjects, studyHours });
      await uploadPDFs(new DataTransfer().files);
      localStorage.setItem('onboardingCompleted', 'true');
      toast({
        title: 'Success',
        description: 'Settings updated successfully.',
      });
      navigate('/study-plan');
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: error?.message,
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-start justify-center bg-gradient-to-br from-background to-secondary p-4">
      <div className="w-full max-w-2xl mb-6">
        <h1 className="text-2xl font-bold text-gray-700">Settings</h1>
        <p className="text-gray-600">
          Update your exam details and study materials.
        </p>
      </div>
      <div className="flex flex-col w-full max-w-7xl space-y-4">
        <div className="space-y-4">
          <Label htmlFor="examDate">Exam Final Date</Label>
          <Input
            id="examDate"
            type="date"
            value={examDate}
            onChange={(e) => setExamDate(e.target.value)}
            className="w-full"
          />
        </div>
        <div className="space-y-4 mt-4">
          <Label htmlFor="subjects">Subjects</Label>
          <div className="flex items-center space-x-2">
            <Input
              id="subjects"
              type="text"
              value={subjectInput}
              onChange={(e) => setSubjectInput(e.target.value)}
              className="w-full"
            />
            <Button onClick={handleAddSubject} className="bg-blue-500 hover:bg-blue-600 text-white">
              Add
            </Button>
          </div>
          <div className="flex flex-wrap gap-2 mt-2">
            {selectedSubjects.map((subject) => (
              <div key={subject} className="flex items-center bg-gray-200 rounded-full px-3 py-1">
                <span>{subject}</span>
                <button
                  onClick={() => handleRemoveSubject(subject)}
                  className="ml-2 text-red-500 hover:text-red-700"
                >
                  &times;
                </button>
              </div>
            ))}
          </div>
        </div>
        <div className="space-y-4 mt-4">
          <Label htmlFor="studyHours">Available Daily Study Hours</Label>
          <Input
            id="studyHours"
            type="number"
            value={studyHours}
            onChange={(e) => setStudyHours(e.target.value)}
            className="w-full"
          />
        </div>
        <div className="space-y-4 mt-4">
          <Label>Upload Study Materials</Label>
          <div
            {...getRootProps()}
            className={`py-8 border-dashed border-2 border-gray-300 p-6 ${
              isDragActive ? 'bg-gray-100' : ''
            }`}
          >
            <input {...getInputProps()} />
            <p className="text-center text-gray-600">
              Drag 'n' drop some files here, or click to select files
            </p>
          </div>
          <ul className="mt-2">
            {uploadedFiles.map((file, index) => (
              <li key={index} className="text-gray-700">
                {file.name}
              </li>
            ))}
          </ul>
        </div>
        <Button onClick={handleSubmit} className="w-full mt-6 bg-green-500 hover:bg-green-600 text-white">
          Save Settings
        </Button>
      </div>
    </div>
  );
}