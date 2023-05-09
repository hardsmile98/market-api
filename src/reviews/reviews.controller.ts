import { Body, Controller, Delete, Get, Post } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { CreateReviewDto, DeleteReviewDto } from './dto';

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

  @Delete('/')
  deleteReview(@Body() dto: DeleteReviewDto) {
    return this.reviewsService.deleteReview(dto);
  }
}
