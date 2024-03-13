import { ILeaderboardFull } from '../Interfaces/leaderboard/ILeaderboard';
import IMatchInfos from '../Interfaces/matches/IMatchInfos';
import ITeam from '../Interfaces/teams/ITeam';

class LeaderboardGeneral {
    #team: ITeam;
    #matches: IMatchInfos[];
    constructor(team: ITeam, matches: IMatchInfos[]) {
      this.#team = team;
      this.#matches = matches;
    }

    #getGames(): number {
      const totalGames = this.#matches.filter((match: IMatchInfos) =>
        match.awayTeam.teamName === this.#team.teamName
        || match.homeTeam.teamName === this.#team.teamName).length;
      return totalGames;
    }

    #getVictories(): number {
      const victories = this.#matches.filter((match: IMatchInfos) => (
        match.awayTeam.teamName === this.#team.teamName && match.awayTeamGoals > match.homeTeamGoals
      ) || (
        match.homeTeam.teamName === this.#team.teamName
        && match.homeTeamGoals > match.awayTeamGoals)).length;
      return victories;
    }

    #getLosses(): number {
      const losses = this.#matches.filter((match: IMatchInfos) => (
        match.awayTeam.teamName === this.#team.teamName && match.awayTeamGoals < match.homeTeamGoals
      ) || (
        match.homeTeam.teamName === this.#team.teamName && match.homeTeamGoals < match.awayTeamGoals
      )).length;
      return losses;
    }

    #getDraws(): number {
      const draws = this.#matches.filter((match: IMatchInfos) =>
        (match.awayTeamGoals === match.homeTeamGoals)
          && (match.awayTeam.teamName === this.#team.teamName
            || match.homeTeam.teamName === this.#team.teamName)).length;
      return draws;
    }

    #getPoints(): number {
      const victoryPoints = this.#getVictories() * 3;
      return victoryPoints + this.#getDraws();
    }

    #getGoalsFavor(): number {
      const homeGoals = this.#matches.filter((match: IMatchInfos) =>
        match.homeTeam.teamName === this.#team.teamName)
        .reduce((acc, match) => acc + match.homeTeamGoals, 0);

      const awayGoals = this.#matches.filter((match: IMatchInfos) =>
        match.awayTeam.teamName === this.#team.teamName)
        .reduce((acc, match) => acc + match.awayTeamGoals, 0);

      return homeGoals + awayGoals;
    }

    #getGoalsOwn(): number {
      const homeGoalsOwn = this.#matches.filter((match: IMatchInfos) =>
        match.homeTeam.teamName === this.#team.teamName)
        .reduce((acc, match) => acc + match.awayTeamGoals, 0);

      const awayGoalsOwn = this.#matches.filter((match: IMatchInfos) =>
        match.awayTeam.teamName === this.#team.teamName)
        .reduce((acc, match) => acc + match.homeTeamGoals, 0);

      return homeGoalsOwn + awayGoalsOwn;
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

export default LeaderboardGeneral;
