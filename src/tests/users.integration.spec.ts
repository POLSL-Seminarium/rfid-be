import { expect } from "chai";
import "mocha";
import * as request from "supertest";

describe("/api/users integration", () => {
  it("test example", async () => {
    return request(await global.container.cradle.app)
      .get("/health")
      .expect(200)
  });
});
