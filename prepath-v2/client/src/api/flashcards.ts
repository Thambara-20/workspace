import api from './api';

// Description: Get Flashcards
// Endpoint: GET /api/flashcards
// Request: {}
// Response: { flashcards: Array<string> }
export const getFlashcards = () => {
  // Mocking the response
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        flashcards: [
          'What is AI?',
          'Define Machine Learning.',
          'Explain Deep Learning.',
          'What are Neural Networks?',
          'How to prepare for AI exams?',
        ],
      });
    }, 500);
  });
  // Uncomment the below lines to make an actual API call
  // try {
  //   return await api.get('/api/flashcards');
  // } catch (error) {
  //   throw new Error(error?.response?.data?.error || error.message);
  // }
};