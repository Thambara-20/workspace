import api from './api';

// Description: Get Study Plan
// Endpoint: GET /api/study-plan
// Request: {}
// Response: { plan: Array<{ name: string, duration: string, description: string, completed: boolean }> }
export const getStudyPlan = () => {
  // Mocking the response
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        plan: [
          { name: 'Introduction to AI', duration: '1 hour', description: 'Learn the basics of AI.', completed: false },
          { name: 'Basics of Machine Learning', duration: '2 hours', description: 'Understand machine learning concepts.', completed: false },
          { name: 'Deep Learning Concepts', duration: '1.5 hours', description: 'Explore deep learning techniques.', completed: false },
          { name: 'Neural Networks', duration: '2 hours', description: 'Study neural network architectures.', completed: false },
          { name: 'Exam Preparation', duration: '3 hours', description: 'Review all topics for the exam.', completed: false },
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

// Description: Update Study Session Completion
// Endpoint: PATCH /api/update-study-session
// Request: { sessionId: string, completed: boolean }
// Response: { success: boolean, message: string }
export const updateStudySession = (sessionId: string, completed: boolean) => {
  // Mocking the response
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ success: true, message: 'Session updated successfully' });
    }, 500);
  });
  // Uncomment the below lines to make an actual API call
  // try {
  //   return await api.patch('/api/update-study-session', { sessionId, completed });
  // } catch (error) {
  //   throw new Error(error?.response?.data?.error || error.message);
  // }
};

// Description: Regenerate Study Plan
// Endpoint: POST /api/generate-study-plan
// Request: {}
// Response: { success: boolean, message: string }
export const regenerateStudyPlan = () => {
  // Mocking the response
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ success: true, message: 'Study plan regenerated successfully' });
    }, 500);
  });
  // Uncomment the below lines to make an actual API call
  // try {
  //   return await api.post('/api/generate-study-plan');
  // } catch (error) {
  //   throw new Error(error?.response?.data?.error || error.message);
  // }
};