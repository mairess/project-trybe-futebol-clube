import * as sinon from "sinon";
import * as chai from "chai";
// @ts-ignore
import chaiHttp = require("chai-http");
import { app } from "../app";
import { Response } from "superagent";
import SequelizeMatch from "../database/models/SequelizeMatch";
import { matchFromDB, matchToUpdateFromDB, matchesFinishedFromAPI, 
  matchesFinishedFromDB, 
  matchesFromAPI, 
  matchesFromDB, 
  matchesInProgressFromAPI,
   matchesInProgressFromDB, 
   updatedMatchFromAPI} from "./mocks/Matches.mock";
import JWT from "../utils/JWT";
import MatchService from "../services/MatchService";
import IMatch from "../Interfaces/matches/IMatch";
import { ServiceMessage, ServiceResponse } from "../Interfaces/ServiceResponse";

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
      // const mockFindAllReturn = SequelizeMatch.bulkBuild(matchesFromDB);
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
        // const mockFindAllReturn = SequelizeMatch.bulkBuild(matchesInProgressFromDB);
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
        // const mockFindAllReturn = SequelizeMatch.bulkBuild(matchesFinishedFromDB);
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
      const serviceResponse: ServiceResponse<IMatch> = {
        status: "SUCCESSFUL",
        data: matchFromDB,
      };
      const mockFindByPkReturn = SequelizeMatch.build(matchFromDB);
      sinon.stub(SequelizeMatch, "findByPk").resolves(mockFindByPkReturn);
      sinon.stub(MatchService.prototype, "getMatchById").resolves(serviceResponse);
      // Act
      chaiHttpResponse = await chai.request(app)
      .get("/matches/99")
      .set("authorization", 'Bearer token');
      // Assert
      expect(chaiHttpResponse.status).to.equal(200);
      expect(chaiHttpResponse.body).to.deep.equal(matchFromDB);
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

    it('Should update match score.', async () => {
      // Arrange
      const serviceResponse: ServiceResponse<IMatch> = {
        status: "SUCCESSFUL",
        data: updatedMatchFromAPI,
      };
      sinon.stub(SequelizeMatch, "update").resolves([1]);
      sinon.stub(MatchService.prototype, 'updateMatch').resolves(serviceResponse);

      // const mockUpdatedMatchFromAPI = SequelizeMatch.build(updatedMatchFromAPI)
      // Act
      chaiHttpResponse = await chai.request(app)
      .patch("/matches/48")
      .send({ "homeTeamGoals": 1, "awayTeamGoals": 3 })
      .set("authorization", 'Bearer token');
      // Assert    
      expect(chaiHttpResponse.status).to.equal(200);
      expect(chaiHttpResponse.body).to.deep.equal(updatedMatchFromAPI);
    })
  })

});
