export type Answer = {
  title: string;
  id: number;
}

export type Question = {
  id: number;
  title: string;
  type: "boolean" | "input" | "multiple_choice";
  answers?: Answer[];
  correctAnswers?: string[];
}

export type Quiz = {
  id: number;
  title: string;
  questions: Question[];
};

export type CreateQuizPayload = Omit<Quiz, "id">;

const base_url = process.env.NEXT_PUBLIC_BASE_URL!

export const quizService = {
  getAll: async (): Promise<Quiz[]> => {
    const res = await fetch(`${base_url}/quizzes`);
    if (!res.ok) throw new Error("Failed to fetch quizzes");
    return res.json();
  },

  getById: async (id: string): Promise<Quiz> => {
    const res = await fetch(`${base_url}/quizzes/${id}`);
    if (!res.ok) throw new Error("Failed to fetch quiz");
    return res.json();
  },

  create: async (payload: CreateQuizPayload): Promise<Quiz> => {
    const res = await fetch(`${base_url}/quizzes`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error("Failed to create quiz");
    return res.json();
  },

  delete: async (id: number): Promise<void> => {
    const res = await fetch(`${base_url}/quizzes/${id}`, { method: "DELETE" });
    if (!res.ok) throw new Error("Failed to delete quiz");
  },
};