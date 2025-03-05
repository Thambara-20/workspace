import api from './api';

// Description: Get flashcards data
// Endpoint: GET /api/flashcards
// Request: {}
// Response: { flashcards: Array<{ question: string, answer: string }> }
export const getFlashcardsData = () => {
    // Mocking the response
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                flashcards: [
                    { question: 'What is 2+2?', answer: '4' },
                    { question: 'What is the capital of France?', answer: 'Paris' },
                    { question: 'What is the boiling point of water?', answer: '100°C' },
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
}