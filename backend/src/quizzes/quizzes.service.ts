import { Injectable } from '@nestjs/common';
import { CreateQuizDto, QuestionType } from './dto/create-quiz.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class QuizzesService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateQuizDto) {
    return this.prisma.quiz.create({
      data: {
        title: data.title,
        questions: {
          create: data.questions.map((q) => {
            const questionData: any = {
              title: q.title,
              type: q.type,
              correctAnswers: q.correctAnswers || null,
            };
            
            // Adding answer only if type is multiple choice
            if (q.type === QuestionType.multiple_choice) {
              questionData.answers = {
                create: q.answers.map((a) => ({
                  title: a.title,
                })),
              };
            }

            return questionData;
          }),
        },
      },
      include: {
        questions: { include: { answers: true } },
      },
    });
  }

  async findAll() {
    const quizzes = await this.prisma.quiz.findMany({
      select: {
        id: true,
        title: true,
        _count: {
          select: { questions: true },
        },
      },
    });
    
    // Mapping before return
    return quizzes.map(q => ({
      id: q.id,
      title: q.title,
      questions: q._count.questions,
    }));
  }

  async findOne(id: number) {
    return this.prisma.quiz.findUnique({
      where: { id },
      include: {
        questions: { include: { answers: true } },
      },
    });
  }

  async remove(id: number) {
    return this.prisma.quiz.delete({
      where: { id },
    });
  }
}
