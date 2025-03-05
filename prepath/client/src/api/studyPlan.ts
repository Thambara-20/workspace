import api from './api';

// Description: Generate Study Plan
// Endpoint: POST /api/generate-study-plan
// Request: { pdfs: Array<{ _id: string, filename: string }>, studyDetails: { examDate: string, subjects: string[], dailyStudyTime: number } }
// Response: { success: boolean, studyPlan: string }
export const generateStudyPlan = (data: { pdfs: Array<{ _id: string, filename: string }>, studyDetails: { examDate: string, subjects: string[], dailyStudyTime: number } }) => {
    // Mocking the response
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({ success: true, studyPlan: 'New AI-generated study plan content here...' });
        }, 500);
    });
    // Uncomment the below lines to make an actual API call
    // try {
    //   return await api.post('/api/generate-study-plan', data);
    // } catch (error) {
    //   throw new Error(error?.response?.data?.error || error.message);
    // }
}