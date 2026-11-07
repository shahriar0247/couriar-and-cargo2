"use client";

import { useSyncExternalStore } from "react";

const noop = () => () => {};

/** Current year — client snapshot only, keeps prerender output stable. */
export function Year() {
  const year = useSyncExternalStore(
    noop,
    () => new Date().getFullYear(),
    () => null,
  );
  return <>{year ?? "…"}</>;
}
