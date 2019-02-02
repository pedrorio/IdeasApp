import { Body, Controller, Delete, Get, Logger, Param, Patch, Post, Query, UseGuards, UsePipes } from "@nestjs/common";
import { CommentIdeaService } from "./comment-idea.service";
import { ValidatorPipe } from "../../shared/validator.pipe";
import { UserAuthenticationGuard } from "../../user/authentication/user-authentication.guard";
import { User } from "../../user/user.decorator";
import { CommentDTO } from "../comment.dto";

@Controller("ideas/:ideaId")
export class CommentIdeaController {
  private logger = new Logger("CommentIdeaController");

  constructor(private commentIdeaService: CommentIdeaService) {
  }

  private logData(options: any) {
    options.commentId && this.logger.log(`COMMENT_ID ${JSON.stringify(options.commentId)}`);
    options.data && this.logger.log(`COMMENT_DATA ${JSON.stringify(options.body)}`);
    options.userId && this.logger.log(`USER_ID ${JSON.stringify(options.userId)}`);
    options.ideaId && this.logger.log(`IDEA_ID ${JSON.stringify(options.ideaId)}`);
  }

  @Get("comments")
  findAllIdeaComments(
    @Param("ideaId") ideaId: string,
    @Query("page") page: number
  ) {
    return this.commentIdeaService.findAllIdeaComments(ideaId, page);
  }

  @Post("comments")
  @UsePipes(ValidatorPipe)
  @UseGuards(UserAuthenticationGuard)
  createIdeaComment(
    @Param("ideaId") ideaId: string,
    @User("id") userId: string,
    @Body() data: CommentDTO
  ) {
    this.logData({ ideaId, userId, data });
    return this.commentIdeaService.createIdeaComment(ideaId, userId, data);
  }

  @Patch("comments/:commentId")
  @UsePipes(ValidatorPipe)
  @UseGuards(UserAuthenticationGuard)
  updateIdeaComment(
    @Param("ideaId") ideaId: string,
    @Param("commentId") commentId: string,
    @User("id") userId: string,
    @Body() data: Partial<CommentDTO>
  ) {
    this.logData({ ideaId, commentId, userId, data });
    return this.commentIdeaService.updateIdeaComment(ideaId, commentId, userId, data);
  }

  @Delete("comments/:commentId")
  @UseGuards(UserAuthenticationGuard)
  deleteComment(
    @Param("ideaId") ideaId: string,
    @Param("commentId") commentId: string,
    @User("id") userId: string,
  ) {
    this.logData({ ideaId, commentId, userId });
    return this.commentIdeaService.deleteIdeaComment(ideaId, commentId, userId);
  }

}
