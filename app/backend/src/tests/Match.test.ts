import * as sinon from "sinon";
import * as chai from "chai";
// @ts-ignore
import chaiHttp = require("chai-http");
import { app } from "../app";
import { Response } from "superagent";
import SequelizeMatch from "../database/models/SequelizeMatch";
import {
  createdMatch, matchFromDB, matchesFinishedFromAPI,
  matchesFinishedFromDB,
  matchesFromAPI,
  matchesFromDB,
  matchesInProgressFromAPI,
  matchesInProgressFromDB
} from "./mocks/Matches.mock";
import JWT from "../utils/JWT";

chai.use(chaiHttp);

const { expect } = chai;

describe("Matches tests.", () => {
  let chaiHttpResponse: Response;
  beforeEach(() => {
    sinon.stub(JWT, 'verify').returns({ email: "admin@admin.com", role: 'admin' });
    sinon.stub(JWT, "sign").returns("token");
  })
  afterEach(sinon.restore)
  describe("Route /matches.", () => {
    it("Returns all matches.", async () => {
      // Arrange
      sinon.stub(SequelizeMatch, "findAll").resolves(matchesFromDB as any);
      // Act
      chaiHttpResponse = await chai.request(app)
        .get("/matches")
        .set("authorization", 'Bearer token');
      // Assert
      expect(chaiHttpResponse.status).to.equal(200);
      expect(chaiHttpResponse.body).to.deep.equal(matchesFromAPI);
    });

    it("Returns all in progress matches.", async () => {
      // Arrange
      sinon.stub(SequelizeMatch, "findAll").resolves(matchesInProgressFromDB as any);
      // Act
      chaiHttpResponse = await chai.request(app)
        .get("/matches?inProgress=true")
        .set("authorization", 'Bearer token');
      // Assert
      expect(chaiHttpResponse.status).to.equal(200);
      expect(chaiHttpResponse.body).to.deep.equal(matchesInProgressFromAPI);
    });

    it("Returns all finished matches.", async () => {
      // Arrange
      sinon.stub(SequelizeMatch, "findAll").resolves(matchesFinishedFromDB as any);
      // Act
      chaiHttpResponse = await chai.request(app)
        .get("/matches?inProgress=false")
        .set("authorization", 'Bearer token');
      // Assert
      expect(chaiHttpResponse.status).to.equal(200);
      expect(chaiHttpResponse.body).to.deep.equal(matchesFinishedFromAPI);
    });
  });

  describe('Route /matches/id.', () => {
    it('Should return match by id.', async () => {
      // Arrange
      const mockFindByPkReturn = SequelizeMatch.build(matchFromDB);
      sinon.stub(SequelizeMatch, "findByPk").resolves(mockFindByPkReturn);
      // Act
      chaiHttpResponse = await chai.request(app)
        .get("/matches/99")
        .set("authorization", 'Bearer token');
      // Assert
      expect(chaiHttpResponse.status).to.equal(200);
      expect(chaiHttpResponse.body).to.deep.equal(mockFindByPkReturn.dataValues);
    })

    it('Should not return match if id is not found.', async () => {
      sinon.stub(SequelizeMatch, "findByPk").resolves(null);
      // Act
      chaiHttpResponse = await chai.request(app)
        .get("/matches/999")
        .set("authorization", 'Bearer token');
      // Assert
      expect(chaiHttpResponse.status).to.equal(404);
      expect(chaiHttpResponse.body).to.deep.equal({ message: 'Match not found!' });
    })
    it('Should finish match.', async () => {
      // Arrange
      const mockFindByPkReturn = SequelizeMatch.build(matchFromDB);
      sinon.stub(SequelizeMatch, "findByPk").resolves(mockFindByPkReturn);
      sinon.stub(mockFindByPkReturn, 'save').resolves();
      // Act
      chaiHttpResponse = await chai.request(app)
        .patch("/matches/99/finish")
        .set("authorization", 'Bearer token');
      // Assert
      expect(chaiHttpResponse.status).to.equal(200);
      expect(chaiHttpResponse.body).to.deep.equal({ "message": "Finished" });
    })

    it('Should not finish if id is not found.', async () => {
      // Arrange
      sinon.stub(SequelizeMatch, "findByPk").resolves(null);
      // Act
      chaiHttpResponse = await chai.request(app)
        .patch("/matches/99879879/finish")
        .set("authorization", 'Bearer token');
      // Assert
      expect(chaiHttpResponse.status).to.equal(404);
      expect(chaiHttpResponse.body).to.deep.equal({ message: 'Match not found!' });
    })

    it('Should update match score.', async () => {
      // Arrange
      const mockFindByPkReturn = SequelizeMatch.build(matchFromDB);
      sinon.stub(SequelizeMatch, "findByPk").resolves(mockFindByPkReturn);
      // Act
      chaiHttpResponse = await chai.request(app)
        .patch("/matches/48")
        .send({ "homeTeamGoals": 1, "awayTeamGoals": 3 })
        .set("authorization", 'Bearer token');
      // Assert    
      expect(chaiHttpResponse.status).to.equal(200);
      expect(chaiHttpResponse.body).to.deep.equal(mockFindByPkReturn.dataValues);
    })

    it('Should no update match score if id is not found.', async () => {
      // Arrange
      sinon.stub(SequelizeMatch, "findByPk").resolves(null);
      // Act
      chaiHttpResponse = await chai.request(app)
        .patch("/matches/5498798798")
        .send({ "homeTeamGoals": 1, "awayTeamGoals": 3 })
        .set("authorization", 'Bearer token');
      // Assert    
      expect(chaiHttpResponse.status).to.equal(404);
      expect(chaiHttpResponse.body).to.deep.equal({ message: 'Match not found!' });
    })

    it('Should create match.', async () => {
      // Arrange
      const mockCreteReturn = SequelizeMatch.build(createdMatch);
      sinon.stub(SequelizeMatch, "create").resolves(mockCreteReturn);
      // Act
      chaiHttpResponse = await chai.request(app)
        .post("/matches")
        .send({
          "homeTeamId": 9,
          "awayTeamId": 4,
          "homeTeamGoals": 1,
          "awayTeamGoals": 2
        })
        .set("authorization", 'Bearer token');
      // Assert    
      expect(chaiHttpResponse.status).to.equal(201);
      expect(chaiHttpResponse.body).to.deep.equal(createdMatch);
    })

    it('Should not create match with two equal teams.', async () => {
      // Arrange
      // Act
      chaiHttpResponse = await chai.request(app)
        .post("/matches")
        .send({
          "homeTeamId": 9,
          "awayTeamId": 9,
          "homeTeamGoals": 1,
          "awayTeamGoals": 2
        })
        .set("authorization", 'Bearer token');
      // Assert    
      expect(chaiHttpResponse.status).to.equal(422);
      expect(chaiHttpResponse.body).to.deep.equal({ message: 'It is not possible to create a match with two equal teams' });
    })

    it('Should not create match with not found id.', async () => {
      // Arrange
      sinon.stub(SequelizeMatch, "findAll").resolves([]);
      // Act
      chaiHttpResponse = await chai.request(app)
        .post("/matches")
        .send({
          "homeTeamId": 45455,
          "awayTeamId": 65454,
          "homeTeamGoals": 1,
          "awayTeamGoals": 2
        })
        .set("authorization", 'Bearer token');
      // Assert    
      expect(chaiHttpResponse.status).to.equal(404);
      expect(chaiHttpResponse.body).to.deep.equal({ message: 'There is no team with such id!' });
    })
  })

});
