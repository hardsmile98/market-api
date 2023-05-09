import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateReviewDto, DeleteReviewDto } from './dto';

@Injectable()
export class ReviewsService {
  constructor(private prisma: PrismaService) {}

  async getReviews() {
    const items = await this.prisma.review.findMany();
    return { items };
  }

  async addReview(dto: CreateReviewDto) {
    return await this.prisma.review.create({ data: dto });
  }

  async deleteReview(dto: DeleteReviewDto) {
    // Check is Admin
    return await this.prisma.review.delete({ where: { id: dto.id } });
  }
}
