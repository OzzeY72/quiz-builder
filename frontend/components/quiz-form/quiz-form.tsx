"use client";

import { useFieldArray, useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useEffect } from "react";
import styles from "./quiz-form.module.css";
import { Quiz, quizService } from "@/services/quizService";
import Button from "../ui/button/button";

// Zod scheme
const answerSchema = z.object({
  title: z.string().min(1, "Answer title is required"),
});

const questionSchema = z.object({
  title: z.string().min(1, "Question title is required"),
  type: z.enum(["boolean", "input", "multiple_choice"]),
  answers: z.array(answerSchema).optional(),
  correctAnswers: z.union([
    z.string(),          
    z.array(z.string()),    
  ]).optional(),
});

const quizSchema = z.object({
  title: z.string().min(1, "Quiz title is required"),
  questions: z.array(questionSchema).min(1, "At least one question is required"),
});

export type QuizFormData = z.infer<typeof quizSchema>;

export default function QuizForm() {
  const {
    register,
    control,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<QuizFormData>({
    resolver: zodResolver(quizSchema),
    defaultValues: {
      title: "",
      questions: [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "questions",
  });

  // 🔥 Логируем ошибки в консоль при изменении
  useEffect(() => {
    if (Object.keys(errors).length > 0) {
      console.log("Form validation errors:", errors);
    }
  }, [errors]);

  const onSubmit = async (data: QuizFormData) => {
    // Mapping to match backend
    const normalizedData: QuizFormData = {
      ...data,
      questions: data.questions.map((q) => ({
        ...q,
        correctAnswers: Array.isArray(q.correctAnswers)
          ? q.correctAnswers
          : q.correctAnswers
          ? [q.correctAnswers]
          : [],
      })),
    };
    console.log(normalizedData)
    try {
      await quizService.create(normalizedData as Quiz);
      alert("Quiz created!");
      reset();
    } catch (error) {
      console.error("Submit error:", error);
      alert("Error creating quiz");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      {/* Quiz title */}
      <div>
        <label className={styles.label}>Quiz Title</label>
        <input
          {...register("title")}
          className={styles.input}
          placeholder="Enter quiz title"
        />
        {errors.title && <p className={styles.error}>{errors.title.message}</p>}
      </div>

      {/* Questions */}
      <div>
        <h2 className={styles.label}>Questions</h2>
        {fields.map((field, index) => {
          const questionType = watch(`questions.${index}.type`);

          return (
            <div key={field.id} className={styles.questionCard}>
              <div className={styles.questionHeader}>
                <h3>Question {index + 1}</h3>
                <button
                  type="button"
                  onClick={() => remove(index)}
                  className={styles.buttonRemove}
                >
                  Remove
                </button>
              </div>

              {/* Question title */}
              <input
                {...register(`questions.${index}.title` as const)}
                placeholder="Question text"
                className={styles.input}
              />
              {errors.questions?.[index]?.title && (
                <p className={styles.error}>
                  {errors.questions[index]?.title?.message}
                </p>
              )}

              {/* Question type */}
              <select
                {...register(`questions.${index}.type` as const)}
                className={styles.select}
              >
                <option value="boolean">True/False</option>
                <option value="input">Short Answer</option>
                <option value="multiple_choice">Multiple Choice</option>
              </select>

              {/* Boolean */}
              {questionType === "boolean" && (
                <div className={styles.radioGroup}>
                  <label>
                    <input
                      type="radio"
                      value="true"
                      {...register(
                        `questions.${index}.correctAnswers` as const
                      )}
                    />{" "}
                    True
                  </label>
                  <label>
                    <input
                      type="radio"
                      value="false"
                      {...register(
                        `questions.${index}.correctAnswers` as const
                      )}
                    />{" "}
                    False
                  </label>
                </div>
              )}

              {/* Short answer */}
              {questionType === "input" && (
                <input
                  {...register(`questions.${index}.correctAnswers.0` as const)}
                  placeholder="Correct answer"
                  className={styles.input}
                />
              )}

              {/* Multiple choice */}
              {questionType === "multiple_choice" && (
                <Controller
                  control={control}
                  name={`questions.${index}.answers`}
                  render={({ field }) => (
                    <div className={styles.section}>
                      {(field.value || []).map((answer, ansIdx) => (
                        <div key={ansIdx} className={styles.optionRow}>
                          <input
                            type="text"
                            value={answer.title}
                            onChange={(e) => {
                              const newAnswers = [...(field.value || [])];
                              newAnswers[ansIdx] = {
                                ...newAnswers[ansIdx],
                                title: e.target.value,
                              };
                              field.onChange(newAnswers);
                            }}
                            placeholder="Option text"
                            className={styles.optionInput}
                          />
                          <button
                            type="button"
                            onClick={() => {
                              const newAnswers = [...(field.value || [])];
                              newAnswers.splice(ansIdx, 1);
                              field.onChange(newAnswers);
                            }}
                            className={styles.buttonRemove}
                          >
                            Remove
                          </button>
                        </div>
                      ))}
                      <button
                        type="button"
                        onClick={() =>
                          field.onChange([
                            ...(field.value || []),
                            { title: "" },
                          ])
                        }
                        className={styles.buttonAdd}
                      >
                        Add Option
                      </button>
                    </div>
                  )}
                />
              )}
            </div>
          );
        })}

        <button
          type="button"
          onClick={() =>
            append({
              type: "boolean",
              title: "",
              answers: [],
              correctAnswers: [],
            })
          }
          className={styles.buttonAdd}
        >
          Add Question
        </button>
      </div>

      <button
        type="submit"
        className={styles.buttonSubmit}
      >
        Submit Quiz
      </button>

      <div className={styles.dashboardLink}>
        <Button href="/quizzes" title="Dashboard" />
      </div>
    </form>
  );
}
