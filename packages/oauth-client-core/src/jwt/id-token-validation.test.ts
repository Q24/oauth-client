import { validateSignature } from "./id-token-validation";
import { createTestClient } from "../../test/test-utils";
import { constants } from "../../test/constants";
import { parseIdToken } from "./parseJwt";

const client = createTestClient();

const idTokenString = constants.jwt_response.id_token;

it("validates the signature correctly", async () => {
  const { header } = parseIdToken(idTokenString);

  const isValidSignature = await validateSignature(
    client,
    idTokenString,
    header,
  );

  expect(isValidSignature).toBe(true);
});
