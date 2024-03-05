import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import { Response } from 'superagent';

chai.use(chaiHttp);


const { expect } = chai;

describe('Users test', () => {
  let chaiHttpResponse: Response;

  afterEach(sinon.restore)

  it('Should not login with invalid body data.', async () => {
    // Arrange
    // Act
    chaiHttpResponse = await chai.request(app).post('/login').send({});
    // Assert
    expect(chaiHttpResponse.status).to.equal(400)
    expect(chaiHttpResponse.body).to.deep.equal({ "message": "All fields must be filled" })
  });
});
