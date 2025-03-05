import api from './api';

// Description: Submit onboarding details
// Endpoint: POST /api/onboarding
// Request: { examDate: string, subjects: string[], dailyStudyTime: number, pdfs: File[] }
// Response: { success: boolean, message: string }
export const submitOnboarding = (data: { examDate: string, subjects: string[], dailyStudyTime: number, pdfs: File[] }) => {
    // Mocking the response
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({ success: true, message: 'Onboarding completed successfully' });
        }, 500);
    });
    // Uncomment the below lines to make an actual API call
    // try {
    //   return await api.post('/api/onboarding', data);
    // } catch (error) {
    //   throw new Error(error?.response?.data?.error || error.message);
    // }
}