const runApp = require("./app");
const request = require("supertest");
const nock = require("nock");

jest.mock("./recaptchaEnvVars", () => {
  return { RECAPTCHA_SECRET_KEY: "some-recaptcha-secret-key" };
});

describe("app", () => {
  const app = runApp();

  beforeEach(() => {
    nock.cleanAll();
  });

  it("supports GET /getItem", () => {
    return request(app)
      .get("/getItem")
      .expect(200)
      .then((response) => {
        const expectedResponse = { item: { name: "Beyerdynamic DT 1350" } };
        expect(response.body).toEqual(expectedResponse);
      });
  });

  it("supports OPTIONS /getItem", () => {
    return request(app).options("/getItem").expect(204);
  });

  describe("protected data", () => {
    it("supports GET /getItem", async () => {
      applyGoogleRecaptchaMock(0.9);

      return request(app)
        .get("/getItem")
        .set("recaptcha_token", "some-recaptcha-token")
        .expect(200)
        .then((response) => {
          const expectedResponse = {
            item: { name: "Beyerdynamic DT 1350", price: "123" },
          };
          expect(response.body).toEqual(expectedResponse);
        });
    });

    it("fails when score is below 0.5", () => {
      applyGoogleRecaptchaMock(0.4);

      return request(app)
        .get("/getItem")
        .set("recaptcha_token", "some-recaptcha-token")
        .expect(403);
    });
  });
});

const applyGoogleRecaptchaMock = (score) => {
  nock("https://www.google.com")
    .post("/recaptcha/api/siteverify", (body) => {
      const expectedBody = {
        secret: "some-recaptcha-secret-key",
        response: "some-recaptcha-token",
      };
      return (
        body.secret === expectedBody.secret &&
        body.response === expectedBody.response
      );
    })
    .matchHeader("Content-type", "application/x-www-form-urlencoded")
    .reply(200, {
      success: true,
      score,
    });
};
