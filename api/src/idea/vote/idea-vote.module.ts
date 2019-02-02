import { Module } from "@nestjs/common";
import { IdeaVoteUpvoteModule } from "./upvote/idea-vote-upvote.module";
import { IdeaVoteDownvoteModule } from "./downvote/idea-vote-downvote.module";
import { IdeaVoteService } from "./idea-vote.service";
import { UserEntity } from "../../user/user.entity";
import { IdeaEntity } from "../idea.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserService } from "../../user/user.service";

@Module({
  imports: [
    TypeOrmModule.forFeature(
      [
        UserEntity,
        IdeaEntity
      ]
    ),
    IdeaVoteUpvoteModule,
    IdeaVoteDownvoteModule
  ],
  providers: [
    IdeaVoteService,
    UserService
  ],
  exports: [
    IdeaVoteService
  ]
})
export class IdeaVoteModule {}
