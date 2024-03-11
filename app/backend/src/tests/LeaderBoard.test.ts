import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe("Leader Board tests.", () => {
    let chaiHttpResponse: Response;
    afterEach(sinon.restore);
    describe('Route /leaderBoard/home', () => {
        it("Returns leaderBoard from home matches.", async () => {
            // Arrange
            // Act
            chaiHttpResponse = await chai.request(app).get('/leaderboard/home');
            // Assert
            expect(chaiHttpResponse.status).to.equal(200);
            expect(chaiHttpResponse.body).to.be.an('array');
            expect(chaiHttpResponse.body).not.to.be.empty;
        })
    })

    describe('Route /leaderBoard/away', () => {
        it("Returns leaderBoard from away matches.", async () => {
            // Arrange
            // Act
            chaiHttpResponse = await chai.request(app).get('/leaderboard/away');
            // Assert
            expect(chaiHttpResponse.status).to.equal(200);
            expect(chaiHttpResponse.body).to.be.an('array');
            expect(chaiHttpResponse.body).not.to.be.empty;
        })
    })

    describe('Route /leaderBoard', () => {
        it("Returns general leaderBoard.", async () => {
            // Arrange
            // Act
            chaiHttpResponse = await chai.request(app).get('/leaderboard');
            // Assert
            expect(chaiHttpResponse.status).to.equal(200);
            expect(chaiHttpResponse.body).to.be.an('array');
            expect(chaiHttpResponse.body).not.to.be.empty;
        })
    })
})
