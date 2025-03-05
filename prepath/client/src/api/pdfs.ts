import api from './api';

// Description: Get uploaded PDFs
// Endpoint: GET /api/get-pdfs
// Request: {}
// Response: { pdfs: Array<{ _id: string, filename: string, uploadDate: string, fileSize: number }> }
export const getPdfs = () => {
    // Mocking the response
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                pdfs: [
                    { _id: '1', filename: 'Math.pdf', uploadDate: '2023-10-01', fileSize: 1024 },
                    { _id: '2', filename: 'Science.pdf', uploadDate: '2023-10-02', fileSize: 2048 }
                ],
            });
        }, 500);
    });
    // Uncomment the below lines to make an actual API call
    // try {
    //   return await api.get('/api/get-pdfs');
    // } catch (error) {
    //   throw new Error(error?.response?.data?.error || error.message);
    // }
}

// Description: Delete a PDF
// Endpoint: DELETE /api/delete-pdf/:id
// Request: { id: string }
// Response: { success: boolean, message: string }
export const deletePdf = (id: string) => {
    // Mocking the response
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({ success: true, message: 'PDF deleted successfully' });
        }, 500);
    });
    // Uncomment the below lines to make an actual API call
    // try {
    //   return await api.delete(`/api/delete-pdf/${id}`);
    // } catch (error) {
    //   throw new Error(error?.response?.data?.error || error.message);
    // }
}