import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { quizService, Quiz } from "../../services/quizService";
import QuizDetail from "@/components/quiz-details/quiz-details";

export default function QuizDetailPage() {
  const router = useRouter();
  const { id } = router.query;

  return (
    <QuizDetail id={ id as string}/>
  );
}
