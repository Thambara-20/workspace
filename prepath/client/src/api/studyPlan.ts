import api from './api';

// Description: Get Study Plan
// Endpoint: GET /api/get-study-plan
// Request: {}
// Response: { success: boolean, studyPlan: Array<{ date: string, topics: string[], duration: string }> }
export const getStudyPlan = () => {
    // Mocking the response
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                success: true,
                studyPlan: [
                    { date: 'March 10, 2025', topics: ['Math', 'Science'], duration: '2 hours' },
                    { date: 'March 11, 2025', topics: ['History'], duration: '1.5 hours' },
                ],
            });
        }, 500);
    });
    // Uncomment the below lines to make an actual API call
    // try {
    //   return await api.get('/api/get-study-plan');
    // } catch (error) {
    //   throw new Error(error?.response?.data?.error || error.message);
    // }
}

// Description: Generate Study Plan
// Endpoint: POST /api/generate-study-plan
// Request: { pdfs: Array<{ _id: string, filename: string }>, studyDetails: { examDate: string, subjects: string[], dailyStudyTime: number } }
// Response: { success: boolean, studyPlan: Array<{ date: string, topics: string[], duration: string }> }
export const generateStudyPlan = (data: { pdfs: Array<{ _id: string, filename: string }>, studyDetails: { examDate: string, subjects: string[], dailyStudyTime: number } }) => {
    // Mocking the response
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                success: true,
                studyPlan: [
                    { date: 'March 10, 2025', topics: ['Math', 'Science'], duration: '2 hours' },
                    { date: 'March 11, 2025', topics: ['History'], duration: '1.5 hours' },
                ],
            });
        }, 500);
    });
    // Uncomment the below lines to make an actual API call
    // try {
    //   return await api.post('/api/generate-study-plan', data);
    // } catch (error) {
    //   throw new Error(error?.response?.data?.error || error.message);
    // }
}