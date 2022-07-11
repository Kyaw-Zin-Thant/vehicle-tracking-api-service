//During the test the env variable is set to test
process.env.NODE_ENV = "test";

//Require the dev-dependencies
let chai = require("chai");
let chaiHttp = require("chai-http");
const db = require("../helpers/db");
let server = require("../server");
let should = chai.should();
const vehicle_1_location = {
  id: 1,
  latitude: "16.866633",
  longitude: "96.175053",
  imei: "865608241154173",
  vehicleId: 1,
};

const apikey = "5ef88f71-cbff-4074-b2ff-0f93b541e2c3";
chai.use(chaiHttp);
//Location
describe("Locations", () => {
  beforeEach((done) => {
    db.Location.destroy();
    done();
  });
  afterEach((done) => {
    done();
  });
  /*
   * Test the /POST  accept vehicle location route
   */
  describe("/POST Accept Vehicle Location ", () => {
    it("it should successfully created", (done) => {
      chai
        .request(server)
        .post("/api/v1/location/")
        .set({
          apikey: apikey,
        })
        .send(vehicle_1_location)
        .end((err, res) => {
          res.status.should.equal(200);
          done();
        });
    });
  });
  /*
   * Test the /GET  vehicle location by today range
   */
  describe("/GET Vehicle Location By Today Range", () => {
    it("it should return 200 and locations array", (done) => {
      chai
        .request(server)
        .get("/api/v1/location/" + vehicle_1_location.vehicleId + "?today=true")
        .set({
          apikey: apikey,
        })
        .end((err, res) => {
          res.status.should.equal(200);
          res.body.locations.should.be.a("array");
          done();
        });
    });
  });
  /*
   * Test the /GET  vehicle location by latest
   */
  describe("/GET Vehicle Location By Latest", () => {
    it("it should return 200 and locations array", (done) => {
      chai
        .request(server)
        .get(
          "/api/v1/location/" + vehicle_1_location.vehicleId + "?latest=true"
        )
        .set({
          apikey: apikey,
        })
        .end((err, res) => {
          res.status.should.equal(200);
          res.body.locations.should.be.a("array");
          done();
        });
    });
  });
  /*
   * Test the /GET  vehicle location by date range
   */
  describe("/GET Vehicle Location By Date Range", () => {
    it("it should return 200 and locations array", (done) => {
      chai
        .request(server)
        .get(
          "/api/v1/location/" +
            vehicle_1_location.vehicleId +
            "?start=2022-07-07T17:35:59.000Z&end=2022-07-10T19:16:30.000Z"
        )
        .set({
          apikey: apikey,
        })
        .end((err, res) => {
          res.status.should.equal(200);
          res.body.locations.should.be.a("array");
          done();
        });
    });
  });
});
