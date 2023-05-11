import { Body, Controller, Delete, Get, Post, UseGuards } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { CreateReviewDto, DeleteReviewDto } from './dto';
import { AdminGuard, JwtAuthGuard } from 'src/auth/guard';

@Controller('reviews')
export class ReviewsController {
  constructor(private reviewsService: ReviewsService) {}

  @Get('/')
  getReviews() {
    return this.reviewsService.getReviews();
  }

  @Post('/')
  addReview(@Body() dto: CreateReviewDto) {
    return this.reviewsService.addReview(dto);
  }

  @UseGuards(JwtAuthGuard, AdminGuard)
  @Delete('/')
  deleteReview(@Body() dto: DeleteReviewDto) {
    return this.reviewsService.deleteReview(dto);
  }
}
