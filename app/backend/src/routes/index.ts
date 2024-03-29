import { Router } from 'express';
import teamRouter from './team.routes';
import userRouter from './user.routes';
import matchRouter from './match.routes';
import leaderboardRouter from './leaderboard.routes';

const router = Router();

router.use('/teams', teamRouter);
router.use('/leaderboard', leaderboardRouter);
router.use('/login', userRouter);
router.use('/matches', matchRouter);

export default router;
