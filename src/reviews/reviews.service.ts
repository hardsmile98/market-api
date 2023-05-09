import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateReviewDto, DeleteReviewDto } from './dto';
import { isNumber } from 'class-validator';

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
    if (!isNumber(dto.id)) {
      throw new BadRequestException('Incorrect id');
    }

    return await this.prisma.review.delete({ where: { id: dto.id } });
  }
}
