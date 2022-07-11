//During the test the env variable is set to test
process.env.NODE_ENV = "test";

//Require the dev-dependencies
let chai = require("chai");
let chaiHttp = require("chai-http");
const db = require("../helpers/db");
let server = require("../server");
let should = chai.should();
const vehicle_1 = {
  id: 1,
  vehiclename: "V_1",
  imei: "865608241154173",
};
const apikey = "5ef88f71-cbff-4074-b2ff-0f93b541e2c3";
chai.use(chaiHttp);
//Vehicles
describe("Vehicles", () => {
  beforeEach((done) => {
    db.Vehicle.destroy();
    done();
  });
  /*
   * Test the /GET  Vehicle route
   */
  describe("/GET Vehicle", () => {
    it("it should GET all the vehicles", (done) => {
      chai
        .request(server)
        .get("/api/v1/vehicle")
        .set({
          apikey: apikey,
        })
        .end((err, res) => {
          res.status.should.equal(200);
          res.body.vehicles.should.be.a("array");
          done();
        });
    });
  });
  /*
   * Test the /POST Register  Vehicle route Successfully Register
   */
  describe("/POST Register Vehicle", () => {
    it("it should successfully register", (done) => {
      chai
        .request(server)
        .post("/api/v1/vehicle")
        .set({
          apikey: apikey,
        })
        .send(vehicle_1)
        .end((err, res) => {
          res.status.should.equal(200);
          done();
        });
    });
  });
  /*
   * Test the /POST Register  Vehicle route 400 Already Register
   */
  describe("/POST Register Vehicle", () => {
    it("it should already register", (done) => {
      chai
        .request(server)
        .post("/api/v1/vehicle")
        .set({
          apikey: apikey,
        })
        .send(vehicle_1)
        .end((err, res) => {
          res.status.should.equal(400);
          done();
        });
    });
  });

  /*
   * Test the /GET Detail  Vehicle route
   */
  describe("/GET Detail Vehicle", () => {
    it("it should return 200 and vehicle object", (done) => {
      chai
        .request(server)
        .get("/api/v1/vehicle/" + vehicle_1.id)
        .set({
          apikey: apikey,
        })
        .end((err, res) => {
          res.status.should.equal(200);
          res.body.vehicle.imei.should.equal(vehicle_1.imei);
          done();
        });
    });
  });
  /*
   * Test the /PUT Update  Vehicle route
   */
  describe("/PUT Update Vehicle", () => {
    it("it should successfully updated", (done) => {
      chai
        .request(server)
        .put("/api/v1/vehicle/" + vehicle_1.id)
        .set({
          apikey: apikey,
        })
        .send(vehicle_1)
        .end((err, res) => {
          res.status.should.equal(200);
          done();
        });
    });
  });
  /*
   * Test the /DELETE Delete  Vehicle route
   */
  describe("/DELETE Delete Vehicle", () => {
    it("it should successfully deleted", (done) => {
      chai
        .request(server)
        .delete("/api/v1/vehicle/" + vehicle_1.id)
        .set({
          apikey: apikey,
        })
        .end((err, res) => {
          res.status.should.equal(200);
          done();
        });
    });
  });
});
