const { route } = require("../weeklyToDo");
const weeklyToDoRouter = require("../weeklyToDo");
const routesFor = require("./routesFor");

const routes = routesFor(weeklyToDoRouter);

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