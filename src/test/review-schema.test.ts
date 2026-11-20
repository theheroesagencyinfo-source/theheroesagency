import { describe, expect, it } from "vitest";
import { reviewSchema } from "@/lib/review-schema";

const valid = { name: "Test author", email: "author@example.com", book: "My nonfiction book" };
describe("Author request rules", () => {
  it("requires a name", () => { expect(reviewSchema.safeParse({ ...valid, name: "" }).success).toBe(false); });
  it("requires a valid email", () => { expect(reviewSchema.safeParse({ ...valid, email: "invalid" }).success).toBe(false); });
  it("requires a book title or topic", () => { expect(reviewSchema.safeParse({ ...valid, book: "" }).success).toBe(false); });
  it("allows no author website", () => { expect(reviewSchema.parse(valid).website).toBe(""); });
  it.each(["author website", "email funnel", "launch kit", "custom package", "not sure yet", "author platform development", "audience growth and engagement", "book visibility and promotion", "website redesign", "newsletter setup", "email marketing setup", "email automation", "book visibility campaigns"])("accepts the requested service %s", service => {
    expect(reviewSchema.parse({ ...valid, service }).service).toBe(service);
  });
  it("preserves an inquiry budget separately from its project description", () => { expect(reviewSchema.parse({ ...valid, request_type: "quote", budget: "$700–$1,999", message: "A new author platform" })).toMatchObject({ budget: "$700–$1,999", message: "A new author platform" }); });
  it("rejects an unsupported service", () => { expect(reviewSchema.safeParse({ ...valid, service: "other" }).success).toBe(false); });
  it("requires a message for quote requests", () => { expect(reviewSchema.safeParse({ ...valid, request_type: "quote", message: "" }).success).toBe(false); });
  it("preserves quote details", () => { expect(reviewSchema.parse({ ...valid, request_type: "quote", service: "launch kit", message: "Book launch" })).toMatchObject({ request_type: "quote", service: "launch kit", message: "Book launch" }); });
});