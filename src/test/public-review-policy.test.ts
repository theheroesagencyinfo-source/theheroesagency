import { describe, expect, it } from "vitest";
import { publicReviewProjects } from "../lib/public-review-policy";
import { packageAmounts } from "../lib/pricing-values";

describe("Homepage review eligibility", () => {
  it("shows approved reviews from all six showcases", () => {
    expect([...publicReviewProjects]).toEqual(["adam-courtenay", "trey-toler", "sandra-combe", "daniel-carter", "eleanor-whitmore", "jonathan-reed"]);
  });
});

describe("Unchanged author package prices", () => {
  it("preserves Author Starter at $700", () => expect(packageAmounts["author-starter"]).toBe(700));
  it("preserves Author Growth at $2,000", () => expect(packageAmounts["author-growth"]).toBe(2000));
  it("preserves Author Authority at $5,400", () => expect(packageAmounts["author-authority"]).toBe(5400));
});