"use client";

import { useEffect } from "react";
import { trackMachineView } from "@/features/tracking/events";

/** Fires machine_view once when a product detail page mounts. */
export function TrackMachineView({ slug, brand }: { slug: string; brand: string }) {
  useEffect(() => {
    trackMachineView(slug, brand);
  }, [slug, brand]);
  return null;
}
