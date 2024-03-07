import * as sinon from "sinon";
import * as chai from "chai";
// @ts-ignore
import chaiHttp = require("chai-http");

import { app } from "../app";

import { Response } from "superagent";
import SequelizeMatch from "../database/models/SequelizeMatch";
import { matchesFinishedFromAPI, matchesFinishedFromDB, matchesFromAPI, matchesFromDB, matchesInProgressFromAPI, matchesInProgressFromDB } from "./mocks/Matches.mock";
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
  const token = JWT.sign({ email: "admin@admin.com", role: 'admin' });
  describe("Route /matches.", () => {
    it("Returns all matches.", async () => {
      // Arrange
      // const mockFindAllReturn = SequelizeMatch.bulkBuild(matchesFromDB);
      sinon.stub(SequelizeMatch, "findAll").resolves(matchesFromDB as any);
      // Act
      chaiHttpResponse = await chai.request(app)
      .get("/matches")
      .set("authorization", `Bearer ${token}`);
      // Assert
      expect(chaiHttpResponse.status).to.equal(200);
      expect(chaiHttpResponse.body).to.deep.equal(matchesFromAPI);
    });

    it("Returns all matches in progress.", async () => {
        // Arrange
        // const mockFindAllReturn = SequelizeMatch.bulkBuild(matchesInProgressFromDB);
        sinon.stub(SequelizeMatch, "findAll").resolves(matchesInProgressFromDB as any);
        // Act
        chaiHttpResponse = await chai.request(app)
        .get("/matches?inProgress=true")
        .set("authorization", `Bearer ${token}`);
        // Assert
        expect(chaiHttpResponse.status).to.equal(200);
        expect(chaiHttpResponse.body).to.deep.equal(matchesInProgressFromAPI);
      });
  });

  it("Returns all matches finished.", async () => {
    // Arrange
    // const mockFindAllReturn = SequelizeMatch.bulkBuild(matchesFinishedFromDB);
    sinon.stub(SequelizeMatch, "findAll").resolves(matchesFinishedFromDB as any);
    // Act
    chaiHttpResponse = await chai.request(app)
    .get("/matches?inProgress=false")
    .set("authorization", `Bearer ${token}`);
    // Assert
    expect(chaiHttpResponse.status).to.equal(200);
    expect(chaiHttpResponse.body).to.deep.equal(matchesFinishedFromAPI);
  });

});
