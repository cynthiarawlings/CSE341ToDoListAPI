const { route } = require("../dailyToDo");
const dailyToDoRouter = require("../dailyToDo");
const routesFor = require("./routesFor");

const routes = routesFor(dailyToDoRouter);

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
});