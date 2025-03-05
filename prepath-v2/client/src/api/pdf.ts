import api from './api';

// Description: Upload PDFs
// Endpoint: POST /api/pdf/upload
// Request: { files: FileList }
// Response: { success: boolean, message: string }
export const uploadPDFs = (files: FileList) => {
  // Mocking the response
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ success: true, message: 'PDFs uploaded successfully' });
    }, 500);
  });
  // Uncomment the below lines to make an actual API call
  // try {
  //   const formData = new FormData();
  //   Array.from(files).forEach((file) => formData.append('files', file));
  //   return await api.post('/api/pdf/upload', formData);
  // } catch (error) {
  //   throw new Error(error?.response?.data?.error || error.message);
  // }
};