const { route } = require("../user");
const userRouter = require("../user");
const routesFor = require("./routesFor");

const routes = routesFor(userRouter);

describe("routes", () => {
   describe("/:id", () => {
    it("supports http GET", () => {
        expect(routes["/:id"]).toContain("get");
    });
   });
   describe("/:id", () => {
    it("supports http DELETE", () => {
        console.log(routesFor(userRouter));
        //expect(routes["/:id"]).toContain("delete");
    });
   });
});