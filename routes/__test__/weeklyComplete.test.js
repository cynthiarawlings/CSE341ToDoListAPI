const { route } = require("../weeklyComplete");
const weeklyCompleteRouter = require("../weeklyComplete");
const routesFor = require("./routesFor");

const routes = routesFor(weeklyCompleteRouter);

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