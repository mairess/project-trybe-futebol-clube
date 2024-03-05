import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import SequelizeTeams from '../database/models/SequelizeTeams';
import { teams } from './mocks/Teams.mock';

import { Response } from 'superagent';

chai.use(chaiHttp);


const { expect } = chai;

describe('Teams test', () => {
  let chaiHttpResponse: Response;

  afterEach(sinon.restore)

  it('Returns all teams.', async () => {
    // Arrange
    sinon.stub(SequelizeTeams, "findAll").resolves(teams as any);
    // Act
    chaiHttpResponse = await chai.request(app).get('/teams');
    // Assert
    expect(chaiHttpResponse.status).to.equal(200)
    expect(chaiHttpResponse.body).to.deep.equal(teams)
  });

  // it('Seu sub-teste', () => {
  //   expect(false).to.be.eq(true);
  // });
});
