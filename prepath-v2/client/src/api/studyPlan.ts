import api from './api';

// Description: Get Study Plan
// Endpoint: GET /api/study-plan
// Request: {}
// Response: { plan: Array<string> }
export const getStudyPlan = () => {
  // Mocking the response
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        plan: [
          'Day 1: Introduction to AI',
          'Day 2: Basics of Machine Learning',
          'Day 3: Deep Learning Concepts',
          'Day 4: Neural Networks',
          'Day 5: Exam Preparation',
        ],
      });
    }, 500);
  });
  // Uncomment the below lines to make an actual API call
  // try {
  //   return await api.get('/api/study-plan');
  // } catch (error) {
  //   throw new Error(error?.response?.data?.error || error.message);
  // }
};