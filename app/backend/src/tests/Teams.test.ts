import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import SequelizeTeam from '../database/models/SequelizeTeam';
import { teamsFromAPI, teamFromAPI, teamFromDB, teamsFromDB } from './mocks/Teams.mock';

import { Response } from 'superagent';

chai.use(chaiHttp);


const { expect } = chai;

describe('Team test.', () => {
  let chaiHttpResponse: Response;

  describe('Route /teams.', () => {
    afterEach(sinon.restore)

    it('Returns all teams.', async () => {
      // Arrange
      const mockFindAllReturn = SequelizeTeam.bulkBuild(teamsFromDB)
      sinon.stub(SequelizeTeam, "findAll").resolves(mockFindAllReturn);
      // Act
      chaiHttpResponse = await chai.request(app).get('/teams');
      // Assert
      expect(chaiHttpResponse.status).to.equal(200)
      expect(chaiHttpResponse.body).to.deep.equal(teamsFromAPI)
    });

    it('Returns team by id.', async () => {
      // Arrange
      const mockFindByPkReturn = SequelizeTeam.build(teamFromDB)
      sinon.stub(SequelizeTeam, "findByPk").resolves(mockFindByPkReturn);
      // Act
      chaiHttpResponse = await chai.request(app).get('/teams/2');
      // Assert
      expect(chaiHttpResponse.status).to.equal(200)
      expect(chaiHttpResponse.body).to.deep.equal(teamFromAPI)
    });

    it('Should not return a team.', async () => {
      // Arrange
      sinon.stub(SequelizeTeam, "findByPk").resolves(null);
      // Act
      chaiHttpResponse = await chai.request(app).get('/teams/848484848111');
      // Assert
      expect(chaiHttpResponse.status).to.equal(404)
      expect(chaiHttpResponse.body).to.deep.equal({ message: "Team not found!" })
    });

    it('Handles internal error when finding team.', async () => {
      // Arrange
      const mockCreateReturn = new Error('Internal error');
      sinon.stub(SequelizeTeam, "findByPk").rejects(mockCreateReturn);
      // Act
      chaiHttpResponse = await chai.request(app).get('/teams/45');
      // Assert
      expect(chaiHttpResponse.status).to.equal(500)
      expect(chaiHttpResponse.body).to.deep.equal({ message: "Internal error" })
    });
  })
});
