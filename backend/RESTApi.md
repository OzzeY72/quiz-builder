# Quiz Builder REST API

## Base URL

`http://localhost:3000`

## Endpoints

### 1. Create a new quiz

**POST /quizzes**

- Request body (JSON):

```json
{
  "title": "General Knowledge Quiz",
  "questions": [
    {
      "title": "Is the sky blue?",
      "type": "BOOLEAN",
      "answers": []
    },
    {
      "title": "What is the capital of France?",
      "type": "MULTIPLE_CHOICE",
      "answers": [{ "title": "Paris" }, { "title": "London" }, { "title": "Berlin" }]
    }
  ]
}
```

- Response (example):

```json
{
  "id": 1,
  "title": "General Knowledge Quiz",
  "questions": [
    {
      "id": 1,
      "title": "Is the sky blue?",
      "type": "boolean",
      "correctAnswers": ["true"],
      "quizId": 1,
      "answers": []
    },
    {
      "id": 2,
      "title": "What is the capital of France?",
      "type": "multiple_choice",
      "correctAnswers": ["Paris"],
      "quizId": 1,
      "answers": [
        {
          "id": 1,
          "title": "Paris",
          "questionId": 8
        },
        {
          "id": 2,
          "title": "Berlin",
          "questionId": 8
        },
        {
          "id": 3,
          "title": "London",
          "questionId": 8
        }
      ]
    }
  ]
}
```

### 2. Get all quizzes

**GET /quizzes**

- Response:

```json
[
  {
    "id": 1,
    "title": "General Knowledge Quiz",
    "questions": 2
  },
  {
    "id": 2,
    "title": "Math Quiz",
    "questions": 5
  }
]
```

### 3. Get all quizzes

**GET /quizzes/:id**

- Response:

```json
{
  "id": 1,
  "title": "General Knowledge Quiz",
  "questions": [
    {
      "id": 1,
      "title": "Is the sky blue?",
      "type": "boolean",
      "answers": []
    },
    {
      "id": 2,
      "title": "What is the capital of France?",
      "type": "multiple_choice",
      "answers": [
        { "id": 1, "title": "Paris" },
        { "id": 2, "title": "London" },
        { "id": 3, "title": "Berlin" }
      ]
    }
  ]
}
```

### 4. Delete a quiz

**DELETE /quizzes/:id**

- Response:

```json
{
  "id": 1,
  "title": "General Knowledge Quiz"
}
```

Note: Deleting a quiz will also delete its questions and answers if cascade deletion is enabled.
