import env from "./index";

const mockEnv = {
  INT: "42",
  FLOAT: "3.14",
  BOOL: "true",
  BOOL_1: "1",
  BOOL_YES: "yes",
  BOOL_YES_UPPER: "YES",
  BOOL_ON: "on",
  BOOL_ON_UPPER: "ON",
  JSON: '{"foo":"bar"}',
  ARRAY: "foo,bar,baz",
  ARRAY_BRACKETS: "[foo,bar,baz]",
  ARRAY_TRIM: " foo , bar , baz ",
};

describe("Tests", () => {
  beforeEach(() => {
    jest.resetModules();
    process.env = { ...mockEnv };
  });

  afterEach(() => {
    process.env = mockEnv;
  });

  describe("Env", () => {
    it("Key does not exist, no default, returns undefined", () => {
      expect(env("NOT_EXISTING")).toBeUndefined();
    });

    it("Key does not exist, default is set, returns default", () => {
      expect(env("NOT_EXISTING", 42)).toBe(42);
      expect(env("NOT_EXISTING", 4.2)).toBe(4.2);
      expect(env("NOT_EXISTING", "foo")).toBe("foo");
      expect(env("NOT_EXISTING", true)).toBe(true);
      expect(env("NOT_EXISTING", [1, 2])).toEqual([1, 2]);
    });

    it("Key exists, returns value", () => {
      expect(env("INT")).toBe("42");
    });
  });

  describe("Int", () => {
    it("Key does not exist, no default, returns undefined", () => {
      expect(env.int("NOT_EXISTING")).toBeUndefined();
    });

    it("Key does not exist, default is set, returns default", () => {
      expect(env.int("NOT_EXISTING", 42)).toBe(42);
    });

    it("Key exists, returns int", () => {
      expect(env.int("INT")).toBe(42);
    });
  });

  describe("Float", () => {
    it("Key does not exist, no default, returns undefined", () => {
      expect(env.float("NOT_EXISTING")).toBeUndefined();
    });

    it("Key does not exist, default is set, returns default", () => {
      expect(env.float("NOT_EXISTING", 4.3)).toBe(4.3);
    });

    it("Key exists, returns float", () => {
      expect(env.float("FLOAT")).toBe(3.14);
    });
  });

  describe("Bool", () => {
    it("Key does not exist, no default, returns undefined", () => {
      expect(env.bool("NOT_EXISTING")).toBeUndefined();
    });

    it("Key does not exist, default is set, returns default", () => {
      expect(env.bool("NOT_EXISTING", true)).toBe(true);
    });

    it("Key exists, returns float", () => {
      expect(env.bool("BOOL")).toBe(true);
      expect(env.bool("BOOL_1")).toBe(true);
      expect(env.bool("BOOL_YES")).toBe(true);
      expect(env.bool("BOOL_YES_UPPER")).toBe(true);
      expect(env.bool("BOOL_ON")).toBe(true);
      expect(env.bool("BOOL_ON_UPPER")).toBe(true);
    });
  });

  describe("JSON", () => {
    it("Key does not exist, no default, returns undefined", () => {
      expect(env.json("NOT_EXISTING")).toBeUndefined();
    });

    it("Key does not exist, default is set, returns default", () => {
      expect(env.json("NOT_EXISTING", { foo: "bar" })).toEqual({ foo: "bar" });
    });

    it("Key exists, returns JSON", () => {
      expect(env.json("JSON")).toEqual({ foo: "bar" });
    });
  });

  describe("Array", () => {
    it("Key does not exist, no default, returns undefined", () => {
      expect(env.array("NOT_EXISTING")).toBeUndefined();
    });

    it("Key does not exist, default is set, returns default", () => {
      expect(env.array("NOT_EXISTING", ["foo", "bar"])).toEqual(["foo", "bar"]);
    });

    it("Key exists, returns array", () => {
      expect(env.array("ARRAY")).toEqual(["foo", "bar", "baz"]);
      expect(env.array("ARRAY_BRACKETS")).toEqual(["foo", "bar", "baz"]);
      expect(env.array("ARRAY_TRIM")).toEqual(["foo", "bar", "baz"]);
    });

    it("No trim", () => {
      expect(env.array("ARRAY_TRIM", undefined, false)).toEqual([
        " foo ",
        " bar ",
        " baz ",
      ]);
    });
  });
});
