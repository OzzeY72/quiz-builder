"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { quizService, Quiz } from "@/services/quizService";
import Question from "../ui/question/question";
import styles from './quiz-details.module.css';

export default function QuizDetail({ id }: {id: string}) {
  const params = useParams();
  const router = useRouter();

  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchQuiz = async () => {
      try {
        const data = await quizService.getById(id as string);
        setQuiz(data);
      } catch (error) {
        console.error(error);
        alert("Error fetching quiz");
        // Return to dashboard if not found
        router.push("/quizzes");
      } finally {
        setLoading(false);
      }
    };

    fetchQuiz();
  }, [id, router]);

  if (loading) return <p>Loading...</p>;
  if (!quiz) return <p>Quiz not found</p>;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{quiz.title}</h1>
      <div className={styles.questions}>
        {quiz.questions.map((q, index) => (
          <Question key={q.id} question={q} index={index} />
        ))}
      </div>
    </div>
  );
}
