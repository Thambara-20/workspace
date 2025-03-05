import api from './api';

// Description: Submit Onboarding Details
// Endpoint: POST /api/onboarding
// Request: { examDate: string, selectedSubjects: string[], studyHours: string }
// Response: { success: boolean, message: string }
export const submitOnboardingDetails = (data: { examDate: string, selectedSubjects: string[], studyHours: string }) => {
  // Mocking the response
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ success: true, message: 'Onboarding details submitted successfully' });
    }, 500);
  });
  // Uncomment the below lines to make an actual API call
  // try {
  //   return await api.post('/api/onboarding', data);
  // } catch (error) {
  //   throw new Error(error?.response?.data?.error || error.message);
  // }
};