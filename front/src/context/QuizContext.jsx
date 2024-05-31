import { createContext, useState } from 'react';

export const QuizContext = createContext();

// Todo: CategoryContext 상태값들 여기에 합치기
export function QuizProvider({ children }) {
    const [quizOpen, setQuizOpen] = useState(false);

    return (
        <QuizContext.Provider value={{quizOpen, setQuizOpen}}>
            {children}
        </QuizContext.Provider>
    )
}