let server = require("../server");

var assert = require("assert");

const db = require("../app/models");
const Bin = db.bin;

//During the test the env variable is set to test
process.env.NODE_ENV = "test";

let chai = require("chai");
let chaiHttp = require("chai-http");

let should = chai.should();

chai.use(chaiHttp);
//Our parent block
describe("Bins APIs", () => {
  // Create a Bin

  beforeEach((done) => {
    //Before each test we empty the database
    Bin.destroy({
      where: {},
    });

    done();
  });

  /*
   * Test the /GET route
   */
  describe("/GET bin", () => {
    it("it should GET no bins back", (done) => {
      chai
        .request(server)
        .get("/api/bin")
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("array");
          res.body.length.should.be.eql(0);
          done();
        });
    });
  });

  describe("/POST bin", () => {
    it("it should not POST a bin without Height field", (done) => {
      let bin = {
        sizeLong: 1,
        sizeWide: 1,
        dailyCost: 1,
        description: "example",
      };

      chai
        .request(server)
        .post("/api/bin")
        .send(bin)
        .end((err, res) => {
          res.should.have.status(500);
          res.body.should.be.a("object");
          res.body.should.have
            .property("message")
            .eql("notNull Violation: bin.sizeHeight cannot be null");
          done();
        });
    });

    it("it should POST a correct bin successfully", (done) => {
      let bin = {
        sizeLong: 1,
        sizeHeight: 1,
        sizeWide: 1,
        dailyCost: 1,
        description: "example",
      };
      chai
        .request(server)
        .post("/api/bin")
        .send(bin)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          res.body.should.have.property("id");
          res.body.should.have.property("sizeLong");
          res.body.should.have.property("sizeHeight");
          res.body.should.have.property("sizeWide");
          res.body.should.have.property("dailyCost");
          res.body.should.have.property("description");
          done();
        });
    });
  });
});
