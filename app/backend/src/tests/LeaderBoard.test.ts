import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import { Response } from 'superagent';
import {
    leaderBoardAwayFromAPI,
    leaderBoardAwayWithEfficiencyFromAPI,
    leaderBoardHomeFromAPI,
    leaderBoardHomeWithEfficiencyFromAPI
} from './mocks/LeaderBoard';

chai.use(chaiHttp);

const { expect } = chai;

describe("Leader Board tests.", () => {
    let chaiHttpResponse: Response;
    afterEach(sinon.restore);
    describe('Route /leaderBoard/home', () => {
        it("Returns team rank home matches.", async () => {
            // Arrange

            // Act
            chaiHttpResponse = await chai.request(app).get('/leaderboard/home');

            // Assert
            expect(chaiHttpResponse.status).to.equal(200);
            expect(chaiHttpResponse.body).to.deep.equal(leaderBoardHomeFromAPI);
        })

        it("Returns team rank home matches with efficiency.", async () => {
            // Arrange

            // Act
            chaiHttpResponse = await chai.request(app)
                .get('/leaderboard/home?efficiency=true');

            // Assert
            expect(chaiHttpResponse.status).to.equal(200);
            expect(chaiHttpResponse.body).to.deep.equal(leaderBoardHomeWithEfficiencyFromAPI);
        })
    })

    describe('Route /leaderBoard/away', () => {
        it("Returns team rank away matches.", async () => {
            // Arrange

            // Act
            chaiHttpResponse = await chai.request(app).get('/leaderboard/away');

            // Assert
            expect(chaiHttpResponse.status).to.equal(200);
            expect(chaiHttpResponse.body).to.deep.equal(leaderBoardAwayFromAPI);
        })

        it("Returns team rank away matches with efficiency.", async () => {
            // Arrange

            // Act
            chaiHttpResponse = await chai.request(app)
                .get('/leaderboard/away?efficiency=true');

            // Assert
            expect(chaiHttpResponse.status).to.equal(200);
            expect(chaiHttpResponse.body).to.deep.equal(leaderBoardAwayWithEfficiencyFromAPI);
        })
    })

    describe('Route /leaderboard', () => {
        it("Returns general rank.", async () => {
            // Arrange
    
            // Act
            chaiHttpResponse = await chai.request(app)
                .get('/leaderboard');
    
            // Assert
            expect(chaiHttpResponse.status).to.equal(200);
            expect(chaiHttpResponse.body).to.deep.equal(leaderBoardAwayWithEfficiencyFromAPI);
        })
    })
})