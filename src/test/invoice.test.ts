import { describe, it, expect } from "vitest";
import { invoiceLines, progressOf, packages, addons, addonAmounts } from "@/lib/packages";
import { paymentSchedule } from "@/lib/pricing-values";

describe("new author packages", () => {
  it("charges $700 for Author Starter with $350/$350 payments", () => {
    const invoice = invoiceLines("author-starter", [], false);
    expect(invoice.oneOff).toBe(700);
    expect(invoice.schedule.map(step => step.amount)).toEqual([350, 350]);
  });
  it("charges $2,000 for Author Growth with $1,000/$1,000 payments", () => {
    const invoice = invoiceLines("author-growth", [], false);
    expect(invoice.oneOff).toBe(2000);
    expect(invoice.schedule.map(step => step.amount)).toEqual([1000, 1000]);
    expect(packages.find(pkg => pkg.slug === "author-growth")?.popular).toBe(true);
  });
  it("charges $5,400 for Author Authority with $2,160/$1,620/$1,620 payments", () => {
    const invoice = invoiceLines("author-authority", [], false);
    expect(invoice.oneOff).toBe(5400);
    expect(invoice.schedule.map(step => step.amount)).toEqual([2160, 1620, 1620]);
  });
  it("limits Growth to eight pages and a three-email welcome", () => {
    expect(packages.find(pkg => pkg.slug === "author-growth")).toMatchObject({ pages: 8, welcomeEmails: 3 });
  });
  it("limits Authority to twelve pages and a five-email welcome", () => {
    expect(packages.find(pkg => pkg.slug === "author-authority")).toMatchObject({ pages: 12, welcomeEmails: 5 });
  });
  it("includes thirty days of technical support for Authority", () => {
    expect(packages.find(pkg => pkg.slug === "author-authority")?.supportDays).toBe(30);
  });
  it.each(["author-starter", "author-growth"])("includes two revision rounds for %s", slug => {
    expect(packages.find(pkg => pkg.slug === slug)?.revisionRounds).toBe(2);
  });
  it("uses $500/$150/$300 for separately quoted individual services", () => {
    expect(addons.map(addon => addonAmounts[addon.id]?.amount)).toEqual([500, 150, 300]);
  });
  it("keeps cent-exact totals at every payment split", () => {
    expect(paymentSchedule("author-authority", 5400.01).reduce((total, step) => total + Math.round(step.amount * 100), 0)).toBe(540001);
  });
});
describe("existing agreements", () => {
  it("preserves earlier package prices and payment schedules", () => {
    expect(invoiceLines("book-presence", [], false).oneOff).toBe(1500);
    expect(invoiceLines("reader-to-client", [], false).schedule.map(step => step.amount)).toEqual([1200, 900, 900]);
    expect(invoiceLines("book-launch", [], false).schedule.map(step => step.amount)).toEqual([2700, 2700]);
  });
  it("preserves existing add-ons and monthly billing", () => {
    const invoice = invoiceLines("book-launch", ["speaker-page", "maintenance"], true);
    expect(invoice.oneOff).toBe(5950);
    expect(invoice.monthly).toBe(150);
  });
});
describe("progress", () => {
  it("is the share of tasks marked done", () => {
    expect(progressOf([{ done: true }, { done: false }, { done: true }, { done: false }])).toBe(50);
    expect(progressOf([])).toBe(0);
  });
});
