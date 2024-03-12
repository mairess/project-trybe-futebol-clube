import { ILeaderboardFull } from '../Interfaces/leaderboard/ILeaderboard';
import IMatchInfos from '../Interfaces/matches/IMatchInfos';
import ITeam from '../Interfaces/teams/ITeam';

class LeaderboardAway {
  #team: ITeam;
  #matches: IMatchInfos[];
  constructor(team: ITeam, matches: IMatchInfos[]) {
    this.#team = team;
    this.#matches = matches;
  }

  #getGames(): number {
    const totalGames = this.#matches.filter((match: IMatchInfos) =>
      match.awayTeam.teamName === this.#team.teamName).length;
    return totalGames;
  }

  #getVictories(): number {
    const victories = this.#matches.filter((match: IMatchInfos) =>
      (match.awayTeam.teamName === this.#team.teamName
        && match.awayTeamGoals > match.homeTeamGoals)).length;
    return victories;
  }

  #getLosses(): number {
    const losses = this.#matches.filter((match: IMatchInfos) =>
      (match.awayTeam.teamName === this.#team.teamName
        && match.awayTeamGoals < match.homeTeamGoals)).length;
    return losses;
  }

  #getDraws(): number {
    const draws = this.#matches.filter((match: IMatchInfos) =>
      (match.awayTeam.teamName === this.#team.teamName
        && match.awayTeamGoals === match.homeTeamGoals)).length;
    return draws;
  }

  #getPoints(): number {
    const victoryPoints = this.#getVictories() * 3;
    return victoryPoints + this.#getDraws();
  }

  #getGoalsFavor(): number {
    const goalsFavor = this.#matches.filter((match: IMatchInfos) =>
      match.awayTeam.teamName === this.#team.teamName)
      .reduce((acc, match) => acc + match.awayTeamGoals, 0);
    return goalsFavor;
  }

  #getGoalsOwn(): number {
    const goalsOwn = this.#matches.filter((match: IMatchInfos) =>
      match.awayTeam.teamName === this.#team.teamName)
      .reduce((acc, match) => acc + match.homeTeamGoals, 0);

    return goalsOwn;
  }

  #getEfficiency() {
    return Number(((this.#getPoints() / (this.#getGames() * 3)) * 100).toFixed(2));
  }

  getLeadboardObject(): ILeaderboardFull {
    return {
      name: this.#team.teamName,
      totalPoints: this.#getPoints(),
      totalGames: this.#getGames(),
      totalVictories: this.#getVictories(),
      totalDraws: this.#getDraws(),
      totalLosses: this.#getLosses(),
      goalsFavor: this.#getGoalsFavor(),
      goalsOwn: this.#getGoalsOwn(),
      goalsBalance: this.#getGoalsFavor() - this.#getGoalsOwn(),
      efficiency: this.#getEfficiency() };
  }
}

export default LeaderboardAway;
