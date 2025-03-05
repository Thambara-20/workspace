import api from './api';

// Description: Get Flashcards for a Session
// Endpoint: GET /api/flashcards?sessionId=<SESSION_ID>
// Request: { sessionId: string }
// Response: { flashcards: Array<{ question: string, answer: string, learned: boolean }> }
export const getFlashcards = (sessionId: string) => {
  // Mocking the response
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        flashcards: [
          { question: 'What is AI?', answer: 'AI is the simulation of human intelligence in machines.', learned: false },
          { question: 'Define Machine Learning.', answer: 'Machine Learning is a subset of AI that involves training algorithms to learn from data.', learned: false },
          { question: 'Explain Deep Learning.', answer: 'Deep Learning is a subset of ML that uses neural networks with many layers.', learned: true },
          { question: 'What are Neural Networks?', answer: 'Neural Networks are computing systems inspired by the human brain.', learned: false },
          { question: 'How to prepare for AI exams?', answer: 'Review key concepts, practice with flashcards, and take mock exams.', learned: false },
        ],
      });
    }, 500);
  });
  // Uncomment the below lines to make an actual API call
  // try {
  //   return await api.get(`/api/flashcards?sessionId=${sessionId}`);
  // } catch (error) {
  //   throw new Error(error?.response?.data?.error || error.message);
  // }
};

// Description: Update Flashcard Status
// Endpoint: PATCH /api/update-flashcard-status
// Request: { flashcardId: string, learned: boolean }
// Response: { success: boolean, message: string }
export const updateFlashcardStatus = (flashcardId: string, learned: boolean) => {
  // Mocking the response
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ success: true, message: 'Flashcard status updated successfully' });
    }, 500);
  });
  // Uncomment the below lines to make an actual API call
  // try {
  //   return await api.patch('/api/update-flashcard-status', { flashcardId, learned });
  // } catch (error) {
  //   throw new Error(error?.response?.data?.error || error.message);
  // }
};

// Description: Generate Flashcards for a Session
// Endpoint: POST /api/generate-flashcards?sessionId=<SESSION_ID>
// Request: { sessionId: string }
// Response: { success: boolean, message: string }
export const generateFlashcards = (sessionId: string) => {
  // Mocking the response
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ success: true, message: 'Flashcards generated successfully' });
    }, 500);
  });
  // Uncomment the below lines to make an actual API call
  // try {
  //   return await api.post(`/api/generate-flashcards?sessionId=${sessionId}`);
  // } catch (error) {
  //   throw new Error(error?.response?.data?.error || error.message);
  // }
};

// Description: Get Flashcards Progress
// Endpoint: GET /api/flashcards-progress
// Request: {}
// Response: { learnedCount: number, totalCount: number }
export const getFlashcardsProgress = () => {
  // Mocking the response
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ learnedCount: 2, totalCount: 5 });
    }, 500);
  });
  // Uncomment the below lines to make an actual API call
  // try {
  //   return await api.get('/api/flashcards-progress');
  // } catch (error) {
  //   throw new Error(error?.response?.data?.error || error.message);
  // }
};