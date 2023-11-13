import { decycle, retrocycle } from "../src";

describe("json-cycle-ess", () => {
  let cyclicObj: any;
  let nestedObj: any;
  let nestedArray: any;
  let decycledObj: any;

  beforeEach(() => {
    nestedObj = {};
    nestedArray = [];
    cyclicObj = {
      prop: 1,
      deeply: { nested: { path: nestedObj, array: nestedArray } },
    };
    cyclicObj.self = cyclicObj;
    nestedObj.prop = cyclicObj.deeply.nested.path;
    nestedArray.push(cyclicObj.deeply.nested);

    decycledObj = {
      prop: 1,
      self: { $ref: "$" },
      deeply: {
        nested: {
          array: [{ $ref: '$["deeply"]["nested"]' }],
          path: {
            prop: {
              $ref: '$["deeply"]["nested"]["path"]',
            },
          },
        },
      },
    };
  });

  describe("decycle", () => {
    test("removes circular references from a cyclic object and array", () => {
      const result = decycle(cyclicObj);
      expect(result).toEqual(decycledObj);
    });
  });

  describe("retrocycle", () => {
    test("adds back circular references to a previously decycled object and array", () => {
      const result = retrocycle(decycledObj);
      expect(result).toEqual(cyclicObj);
    });
  });
});
