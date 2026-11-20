// Browser-safe catalog and cent-exact schedules. Legacy keys preserve agreed existing orders.
export const packageAmounts = { "author-starter": 700, "author-growth": 2000, "author-authority": 5400, "book-presence": 1500, "reader-to-client": 3000, "book-launch": 5400 } as const;
export type PricedPackage = keyof typeof packageAmounts;
export function formatPrice(amount: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", minimumFractionDigits: Number.isInteger(amount) ? 0 : 2, maximumFractionDigits: 2 }).format(amount);
}
export function paymentSchedule(pkg: PricedPackage, total: number = packageAmounts[pkg]) {
  const cents = Math.round(total * 100);
  const authority = pkg === "author-authority" || pkg === "book-presence" || pkg === "reader-to-client";
  const first = Math.round(cents * (authority ? 0.4 : 0.5));
  const second = authority ? Math.round(cents * 0.3) : cents - first;
  return authority ? [
    { label: "40% deposit", amount: first / 100 },
    { label: "30% at the agreed project milestone", amount: second / 100 },
    { label: "30% before final launch", amount: (cents - first - second) / 100 },
  ] : [{ label: "50% deposit", amount: first / 100 }, { label: "50% before final launch", amount: second / 100 }];
}
export function threePaymentAmounts(total: number) {
  const cents = Math.round(total * 100);
  const first = Math.floor(cents / 3);
  return [first / 100, first / 100, (cents - first * 2) / 100];
}
export function threePaymentDescription(total: number) {
  const amounts = threePaymentAmounts(total).map(formatPrice);
  return `${amounts[0]}, ${amounts[1]}, and ${amounts[2]} (total ${formatPrice(total)})`;
}
