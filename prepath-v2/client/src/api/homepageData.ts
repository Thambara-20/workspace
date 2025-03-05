import api from './api';

// Description: Get Homepage Data
// Endpoint: GET /api/homepage-data
// Request: {}
// Response: { nextSession: { subject: string, duration: string }, studyProgress: number, recentPDFs: Array<{ filename: string, uploadDate: string }> }
export const getHomepageData = () => {
  // Mocking the response
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        nextSession: { subject: 'AI Basics', duration: '1 hour' },
        studyProgress: 40,
        recentPDFs: [
          { filename: 'AI_Introduction.pdf', uploadDate: '2023-10-01' },
          { filename: 'Machine_Learning_Basics.pdf', uploadDate: '2023-10-02' },
          { filename: 'Deep_Learning_Concepts.pdf', uploadDate: '2023-10-03' },
        ],
      });
    }, 500);
  });
  // Uncomment the below lines to make an actual API call
  // try {
  //   return await api.get('/api/homepage-data');
  // } catch (error) {
  //   throw new Error(error?.response?.data?.error || error.message);
  // }
};