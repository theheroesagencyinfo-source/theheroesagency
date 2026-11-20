import { describe, it, expect } from "vitest";
import { packages } from "@/lib/packages";
describe("estimated package timelines", () => {
  it("estimates Starter at two to three weeks", () => { expect(packages.find(p => p.slug === "author-starter")?.deliveryWeeks).toEqual([2, 3]); });
  it("estimates Growth at three to five weeks", () => { expect(packages.find(p => p.slug === "author-growth")?.deliveryWeeks).toEqual([3, 5]); });
  it("estimates Authority at six to eight weeks", () => { expect(packages.find(p => p.slug === "author-authority")?.deliveryWeeks).toEqual([6, 8]); });
});
