"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Quiz, quizService } from "@/services/quizService";
import Button from "../ui/button/button";
import QuizComponent from "../ui/quiz/quiz";

import styles from './quiz-list.module.css';


export default function QuizList() {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchQuizzes = async () => {
    try {
      const data = await quizService.getAll();

      setQuizzes(data);
    } catch (error) {
      console.error(error);
      alert("Error fetching quizzes");
    } finally {
      setLoading(false);
    }
  };

  const deleteQuiz = async (id: number) => {
    if (!confirm("Are you sure you want to delete this quiz?")) return;
    try {
      quizService.delete(id)
      setQuizzes((prev) => prev.filter((quiz) => quiz.id !== id));
    } catch (error) {
      console.error(error);
      alert("Error deleting quiz");
    }
  };

  useEffect(() => {
    fetchQuizzes();
  }, []);

  if (loading) return <p>Loading...</p>;

  if (quizzes.length === 0) return <p>No quizzes available</p>;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>My Quizzes</h1>
        <Button href="/create" title="+ Create Quiz" />
      </div>
      <ul className={styles.list}>
        {quizzes.map((quiz) => (
          <QuizComponent
            key={quiz.id}
            quiz={quiz}
            deleteQuiz={deleteQuiz}
          />
        ))}
      </ul>
    </div>
  );
}
