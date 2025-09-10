import React from "react";

import { Question as QuestionType } from "@/services/quizService";
import styles from './question.module.css';

interface QuestionProps {
  question: QuestionType;
  index: number;
}

const Question: React.FC<QuestionProps> = ({ question, index }) => {
   return (
    <div className={styles.container}>
      <h2 className={styles.title}>
        {index + 1}. {question.title}
      </h2>

      {question.type === "boolean" && (
        <div className={styles.section}>
          <p>Type: True/False</p>
          <p>Correct answer: {question.correctAnswers?.[0] ?? "N/A"}</p>
        </div>
      )}

      {question.type === "input" && (
        <div className={styles.section}>
          <p>Type: Short Answer</p>
          <p>Correct answer: {question.correctAnswers?.[0] ?? "N/A"}</p>
        </div>
      )}

      {question.type === "multiple_choice" && (
        <div className={styles.section}>
          <p>Type: Multiple Choice</p>
          <ul className={styles.list}>
            {question.answers?.map((ans, idx) => (
              <li key={idx}>
                {ans.title}{" "}
                {question.correctAnswers?.some((ca: any) => ca === ans.title) && (
                  <span className={styles.correct}>(correct)</span>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Question;
