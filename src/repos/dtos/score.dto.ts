import { ApiProperty } from '@nestjs/swagger';
import { Score } from '@prisma/client';

class ScoreDto {
  id: number
  score: number
  createdAt: DateTime

  constructor(id: number, score: number, createdAt: DateTime) {
    this.id = id;
    this.score = score;
    this.createdAt = createdAt
  }
}

export class ScoreDtoBuilder {
   id: number
  score: number
  createdAt: DateTime

  setBoardInfo(score: Score) {
    this.id = score.id;
    this.score = score.score;
    this.createdAt = score.createdAt
    return this;
  }

  build() {
    return new ScoreDto(this.id, this.score, this.createdAt);
  }
}

export class GetScoreListDto {
  scoreList: ScoreDto[];

  constructor(contents: ScoreDto[]) {
    this.scoreList = [...contents];
  }
}