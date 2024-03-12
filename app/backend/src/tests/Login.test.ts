import * as sinon from "sinon";
import * as chai from "chai";
import JWT from "../utils/JWT";
import UserModel from "../models/UserModel";
// @ts-ignore
import chaiHttp = require("chai-http");

import { app } from "../app";

import { Response } from "superagent";
import UserService from "../services/UserService";
import { ServiceResponse } from "../Interfaces/ServiceResponse";
import { IRole } from "../Interfaces/IRole";
import { userFromDB } from "./mocks/Login.mock";

chai.use(chaiHttp);

const { expect } = chai;

describe("Login tests.", () => {
  let chaiHttpResponse: Response;
  describe("Route /login.", () => {
    afterEach(sinon.restore);

    it("Should not log with invalid body data.", async () => {
      // Arrange
      // Act
      chaiHttpResponse = await chai.request(app).post("/login").send({});
      // Assert
      expect(chaiHttpResponse.status).to.equal(400);
      expect(chaiHttpResponse.body).to.deep.equal({
        message: "All fields must be filled",
      });
    });

    it("Should not log with email not found.", async () => {
      // Arrange
      sinon
        .stub(UserModel.prototype, "findByEmail")
        .resolves(null);
      const body = {
        email: "asdasd@admin.com",
        password: "secret_admin",
      };
      // Act
      chaiHttpResponse = await chai.request(app).post("/login").send(body);
      // Assert
      expect(chaiHttpResponse.status).to.equal(401);
      expect(chaiHttpResponse.body).to.deep.equal({
        message: "Invalid email or password",
      });
    });

    it("Should not log with wrong password.", async () => {
      // Arrange
      const body = {
        email: "admin@admin.com",
        password: "asdadadad",
      };
      // Act
      chaiHttpResponse = await chai.request(app).post("/login").send(body);
      // Assert
      expect(chaiHttpResponse.status).to.equal(401);
      expect(chaiHttpResponse.body).to.deep.equal({
        message: "Invalid email or password",
      });
    });

    it("Returns a token with valid body data.", async () => {
      // Arrange
      sinon.stub(JWT, "sign").returns("strongToken");
      const body = {
        email: "admin@admin.com",
        password: "secret_admin",
      };
      // Act
      chaiHttpResponse = await chai.request(app).post("/login").send(body);
      // Assert
      expect(chaiHttpResponse.status).to.equal(200);
      expect(chaiHttpResponse.body).to.deep.equal({ token: "strongToken" });
    });
  });

  describe("Route /login/role.", () => {
    afterEach(sinon.restore);

    it('Returns "admin" as role.', async () => {
      // Arrange
      sinon.stub(JWT, "verify").returns({ email: 'admin@admin.com', role: "admin" });
      sinon.stub(UserModel.prototype, 'findByEmail').resolves(userFromDB)
      // Act
      chaiHttpResponse = await chai
        .request(app)
        .get("/login/role")
        .set("authorization", 'Bearer strongToken');
      // Assert
      expect(chaiHttpResponse.status).to.equal(200);
      expect(chaiHttpResponse.body).to.deep.equal({ role: "admin" });
    });

    it("Should not return role with invalid token.", async () => {
      // Arrange
      const serviceResponse: ServiceResponse<IRole> = {
        status: "UNAUTHORIZED",
        data: { message: "Token must be a valid token" },
      };
      sinon.stub(UserService.prototype, "getRole").resolves(serviceResponse);
      // Act
      chaiHttpResponse = await chai
        .request(app)
        .get("/login/role")
        .set("authorization", "not valid token");
      // Assert
      expect(chaiHttpResponse.status).to.equal(401);
      expect(chaiHttpResponse.body).to.deep.equal({
        message: "Token must be a valid token",
      });
    });

    it("Should not return role when token is not found.", async () => {
      // Arrange
      const serviceResponse: ServiceResponse<IRole> = {
        status: "UNAUTHORIZED",
        data: { message: "Token not found" },
      };
      sinon.stub(UserService.prototype, "getRole").resolves(serviceResponse);
      // Act
      chaiHttpResponse = await chai.request(app).get("/login/role");
      // Assert
      expect(chaiHttpResponse.status).to.equal(401);
      expect(chaiHttpResponse.body).to.deep.equal({
        message: "Token not found",
      });
    });
  });
});
