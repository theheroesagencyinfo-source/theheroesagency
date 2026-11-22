import { createServerFn } from "@tanstack/react-start";
import { reviewSchema } from "./review-schema";

export const submitReview = createServerFn({ method: "POST" })
  .inputValidator((data) => reviewSchema.parse(data))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const id = crypto.randomUUID();
    const { error } = await supabaseAdmin.from("review_requests").insert({
      id,
      name: data.name,
      email: data.email,
      book: data.book,
      website: data.website || null,
      service: data.service,
      message: data.message,
      budget: data.budget,
      request_type: data.request_type,
    });
    if (error) {
      console.error("review insert failed", error.message);
      return { ok: false as const };
    }
    const { notifyOwner } = await import("./notify-owner.server");
    await notifyOwner({
      id, name: data.name, email: data.email,
      kind: data.request_type === "quote" ? "New quote request" : "Free website review request",
      rows: [
        { label: "Name", value: data.name }, { label: "Email", value: data.email },
        { label: "Book", value: data.book }, { label: "Website", value: data.website || "" },
        { label: "Service", value: data.service }, { label: "Budget", value: data.budget },
      ],
      message: data.message,
    });
    return { ok: true as const };
  });
