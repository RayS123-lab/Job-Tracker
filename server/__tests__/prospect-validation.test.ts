import { validateProspect } from "../prospect-helpers";

describe("prospect creation validation", () => {
  test("rejects a blank company name", () => {
    const result = validateProspect({
      companyName: "",
      roleTitle: "Software Engineer",
    });

    expect(result.valid).toBe(false);
    expect(result.errors).toContain("Company name is required");
  });

  test("rejects a blank role title", () => {
    const result = validateProspect({
      companyName: "Google",
      roleTitle: "",
    });

    expect(result.valid).toBe(false);
    expect(result.errors).toContain("Role title is required");
  });
});

describe("target salary validation", () => {
  test("accepts a valid positive integer salary", () => {
    const result = validateProspect({
      companyName: "Google",
      roleTitle: "Software Engineer",
      targetSalary: 120000,
    });

    expect(result.valid).toBe(true);
    expect(result.errors).toHaveLength(0);
  });

  test("accepts null salary (optional)", () => {
    const result = validateProspect({
      companyName: "Google",
      roleTitle: "Software Engineer",
      targetSalary: null,
    });

    expect(result.valid).toBe(true);
    expect(result.errors).toHaveLength(0);
  });

  test("accepts undefined salary (not provided)", () => {
    const result = validateProspect({
      companyName: "Google",
      roleTitle: "Software Engineer",
    });

    expect(result.valid).toBe(true);
    expect(result.errors).toHaveLength(0);
  });

  test("rejects a negative salary", () => {
    const result = validateProspect({
      companyName: "Google",
      roleTitle: "Software Engineer",
      targetSalary: -50000,
    });

    expect(result.valid).toBe(false);
    expect(result.errors).toContain("Salary must be a positive integer");
  });

  test("rejects zero salary", () => {
    const result = validateProspect({
      companyName: "Google",
      roleTitle: "Software Engineer",
      targetSalary: 0,
    });

    expect(result.valid).toBe(false);
    expect(result.errors).toContain("Salary must be a positive integer");
  });

  test("rejects a non-integer salary", () => {
    const result = validateProspect({
      companyName: "Google",
      roleTitle: "Software Engineer",
      targetSalary: 120000.50,
    });

    expect(result.valid).toBe(false);
    expect(result.errors).toContain("Salary must be a positive integer");
  });

  test("rejects a string salary", () => {
    const result = validateProspect({
      companyName: "Google",
      roleTitle: "Software Engineer",
      targetSalary: "$120,000",
    });

    expect(result.valid).toBe(false);
    expect(result.errors).toContain("Salary must be a positive integer");
  });
});

describe("follow-up date validation", () => {
  test("accepts a valid YYYY-MM-DD date", () => {
    const result = validateProspect({
      companyName: "Google",
      roleTitle: "Software Engineer",
      followUpDate: "2025-06-15",
    });

    expect(result.valid).toBe(true);
    expect(result.errors).toHaveLength(0);
  });

  test("accepts null follow-up date (optional)", () => {
    const result = validateProspect({
      companyName: "Google",
      roleTitle: "Software Engineer",
      followUpDate: null,
    });

    expect(result.valid).toBe(true);
    expect(result.errors).toHaveLength(0);
  });

  test("accepts undefined follow-up date (not provided)", () => {
    const result = validateProspect({
      companyName: "Google",
      roleTitle: "Software Engineer",
    });

    expect(result.valid).toBe(true);
    expect(result.errors).toHaveLength(0);
  });

  test("rejects an invalid date format", () => {
    const result = validateProspect({
      companyName: "Google",
      roleTitle: "Software Engineer",
      followUpDate: "06/15/2025",
    });

    expect(result.valid).toBe(false);
    expect(result.errors).toContain("Follow-up date must be in YYYY-MM-DD format");
  });

  test("rejects a non-string follow-up date", () => {
    const result = validateProspect({
      companyName: "Google",
      roleTitle: "Software Engineer",
      followUpDate: 20250615,
    });

    expect(result.valid).toBe(false);
    expect(result.errors).toContain("Follow-up date must be in YYYY-MM-DD format");
  });

  test("rejects a partial date string", () => {
    const result = validateProspect({
      companyName: "Google",
      roleTitle: "Software Engineer",
      followUpDate: "2025-06",
    });

    expect(result.valid).toBe(false);
    expect(result.errors).toContain("Follow-up date must be in YYYY-MM-DD format");
  });
});
