import { validateJwtString } from "./validateJwtString";
import { createTestClient } from "../../test/test-utils";
const client = createTestClient();

const sampleJwt1 =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";

describe("validate JWT string", () => {
  it("does not throw on a valid JWT token", () => {
    expect(() => {
      validateJwtString(client, sampleJwt1);
    }).not.toThrow();
  });
  it("throws on an invalid JWT token (empty string)", () => {
    expect(() => {
      validateJwtString(client, "");
    }).toThrow();
  });
  it("throws on an invalid JWT token (less than 2 parts)", () => {
    expect(() => {
      validateJwtString(client, "two.parts");
    }).toThrow();
  });
  it("throws on an invalid JWT token (not a string)", () => {
    expect(() => {
      // @ts-ignore
      validateJwtString(client, null);
    }).toThrow();
  });
});
