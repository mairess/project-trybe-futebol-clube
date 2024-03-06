import * as sinon from "sinon";
import * as chai from "chai";
// @ts-ignore
import chaiHttp = require("chai-http");

import { app } from "../app";

import { Response } from "superagent";
import SequelizeMatch from "../database/models/SequelizeMatch";
import { matchesFinishedFromAPI, matchesFinishedFromDB, matchesFromAPI, matchesFromDB, matchesInProgressFromAPI, matchesInProgressFromDB } from "./mocks/Matches.mock";

chai.use(chaiHttp);

const { expect } = chai;

describe("Matches tests.", () => {
  let chaiHttpResponse: Response;
  describe("Route /matches.", () => {
    it("Returns all matches.", async () => {
      // Arrange
      const mockFindAllReturn = SequelizeMatch.bulkBuild(matchesFromDB);
      sinon.stub(SequelizeMatch, "findAll").resolves(mockFindAllReturn);
      // Act
      chaiHttpResponse = await chai.request(app).get("/matches");
      // Assert
      expect(chaiHttpResponse.status).to.equal(200);
      expect(chaiHttpResponse.body).to.deep.equal(matchesFromAPI);
    });

    it("Returns all matches in progress.", async () => {
        // Arrange
        const mockFindAllReturn = SequelizeMatch.bulkBuild(matchesInProgressFromDB);
        sinon.stub(SequelizeMatch, "findAll").resolves(mockFindAllReturn);
        // Act
        chaiHttpResponse = await chai.request(app).get("/matches?inProgress=false");
        // Assert
        expect(chaiHttpResponse.status).to.equal(200);
        expect(chaiHttpResponse.body).to.deep.equal(matchesInProgressFromAPI);
      });
  });

  it("Returns all matches finished.", async () => {
    // Arrange
    const mockFindAllReturn = SequelizeMatch.bulkBuild(matchesFinishedFromDB);
    sinon.stub(SequelizeMatch, "findAll").resolves(mockFindAllReturn);
    // Act
    chaiHttpResponse = await chai.request(app).get("/matches?inProgress=false");
    // Assert
    expect(chaiHttpResponse.status).to.equal(200);
    expect(chaiHttpResponse.body).to.deep.equal(matchesFinishedFromAPI);
  });

});
