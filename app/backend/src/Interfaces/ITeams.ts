import { Identifiable } from '.';

export default interface ITeams extends Identifiable {
  id: number,
  teamName: string
}
