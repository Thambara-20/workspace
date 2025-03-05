import api from './api';

// Description: Upload PDFs
// Endpoint: POST /api/upload-pdfs
// Request: { pdfs: File[] }
// Response: { success: boolean, message: string }
export const uploadPDFs = (pdfs: File[]) => {
    // Mocking the response
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({ success: true, message: 'PDFs uploaded successfully' });
        }, 500);
    });
    // Uncomment the below lines to make an actual API call
    // try {
    //   return await api.post('/api/upload-pdfs', { pdfs });
    // } catch (error) {
    //   throw new Error(error?.response?.data?.error || error.message);
    // }
}