import { Identifiable } from '..';

export default interface ITeam extends Identifiable {
  id: number,
  teamName: string
}
