import api from './api';

// Description: Get Uploaded PDFs
// Endpoint: GET /api/pdfs
// Request: {}
// Response: { pdfs: Array<{ filename: string, uploadDate: string }> }
export const getUploadedPDFs = () => {
  // Mocking the response
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        pdfs: [
          { filename: 'AI_Introduction.pdf', uploadDate: '2023-10-01' },
          { filename: 'Machine_Learning_Basics.pdf', uploadDate: '2023-10-02' },
          { filename: 'Deep_Learning_Concepts.pdf', uploadDate: '2023-10-03' },
        ],
      });
    }, 500);
  });
  // Uncomment the below lines to make an actual API call
  // try {
  //   return await api.get('/api/pdfs');
  // } catch (error) {
  //   throw new Error(error?.response?.data?.error || error.message);
  // }
};