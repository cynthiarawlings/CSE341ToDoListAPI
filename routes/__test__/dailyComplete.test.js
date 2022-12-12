const { route } = require("../dailyComplete");
const dailyCompleteRouter = require("../dailyComplete");
const routesFor = require("./routesFor");

const routes = routesFor(dailyCompleteRouter);

describe("routes", () => {
   describe("/:id", () => {
    it("supports http GET", () => {
        expect(routes["/:id"]).toContain("get");
    });
   });
   describe("/:id", () => {
    it("supports http PUT", () => {
        expect(routes["/:id"]).toContain("put");
    });
   });
   describe("/:id", () => {
    it("supports http DELETE", () => {
        expect(routes["/:id"]).toContain("delete");
    });
   });
});