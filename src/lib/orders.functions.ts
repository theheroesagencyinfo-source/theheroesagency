import { createServerFn } from "@tanstack/react-start";
import { orderSchema } from "./packages";

export const submitOrder = createServerFn({ method: "POST" })
  .inputValidator((data) => orderSchema.parse(data))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const id = crypto.randomUUID();
    const { error } = await supabaseAdmin.from("package_orders").insert({ ...data, id });
    if (error) { console.error("order insert failed", error.message); return { ok: false as const }; }
    const { notifyOwner } = await import("./notify-owner.server");
    await notifyOwner({
      id, name: data.name, email: data.email, kind: "New package order",
      rows: [
        { label: "Name", value: data.name }, { label: "Email", value: data.email },
        { label: "Book", value: data.book }, { label: "Package", value: data.package },
        { label: "Add-ons", value: data.addons.join(", ") },
        { label: "Rush", value: data.rush ? "Yes" : "" }, { label: "Wants a call", value: data.wants_call ? "Yes" : "" },
      ],
      message: data.message,
    });
    return { ok: true as const };
  });
