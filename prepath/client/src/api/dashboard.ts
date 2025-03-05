import api from './api';

// Description: Get dashboard data
// Endpoint: GET /api/dashboard
// Request: {}
// Response: { pdfs: Array<{ _id: string, filename: string }>, studyPlan: string, flashcards: Array<{ question: string, answer: string }> }
export const getDashboardData = () => {
    // Mocking the response
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                pdfs: [
                    { _id: '1', filename: 'Math.pdf' },
                    { _id: '2', filename: 'Science.pdf' }
                ],
                studyPlan: 'Study plan content here...',
                flashcards: [
                    { question: 'What is 2+2?', answer: '4' },
                    { question: 'What is the capital of France?', answer: 'Paris' }
                ]
            });
        }, 500);
    });
    // Uncomment the below lines to make an actual API call
    // try {
    //   return await api.get('/api/dashboard');
    // } catch (error) {
    //   throw new Error(error?.response?.data?.error || error.message);
    // }
}