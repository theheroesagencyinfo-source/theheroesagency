CREATE OR REPLACE FUNCTION public.current_verified_email()
RETURNS text LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT lower(u.email) FROM auth.users u
  WHERE u.id = auth.uid() AND u.email_confirmed_at IS NOT NULL AND u.email IS NOT NULL
$$;
REVOKE EXECUTE ON FUNCTION public.current_verified_email() FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.current_verified_email() TO authenticated;

CREATE OR REPLACE FUNCTION public.owns_order(_order_id uuid)
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.package_orders
    WHERE id = _order_id AND lower(email) = public.current_verified_email())
$$;

DROP POLICY IF EXISTS "Clients read own orders" ON public.package_orders;
CREATE POLICY "Clients read own orders" ON public.package_orders FOR SELECT TO authenticated
  USING (lower(email) = public.current_verified_email());