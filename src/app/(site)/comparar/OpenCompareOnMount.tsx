"use client";

import { useEffect } from "react";
import { useCompare } from "@/features/comparison/CompareProvider";

/** /comparar is a shareable deep link: open the compare modal as soon as it mounts. */
export function OpenCompareOnMount() {
  const compare = useCompare();

  useEffect(() => {
    compare.open();
    // eslint-disable-next-line react-hooks/exhaustive-deps -- open once on mount only
  }, []);

  return null;
}
