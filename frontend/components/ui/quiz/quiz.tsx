"use client";
import { Quiz } from '@/services/quizService';
import styles from './quiz.module.css';
import Link from 'next/link';

export default function QuizComponent({ quiz, deleteQuiz }: {quiz: Quiz, deleteQuiz: (id:number)=>void}) {
  
  return (
    <li key={quiz.id} className={styles.listItem}>
      <div>
        <Link href={`/quizzes/${quiz.id}`} className={styles.link}>
          {quiz.title}
        </Link>
        <p className={styles.questionCount}>
          {quiz.questions.length} {quiz.questions.length === 1 ? 'question' : 'questions'}
        </p>
      </div>
      <button
        onClick={() => deleteQuiz(quiz.id)}
        className={styles.deleteButton}
      >
        X
      </button>
    </li>
  );

}
