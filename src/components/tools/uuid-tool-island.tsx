"use client";

import dynamic from "next/dynamic";
import { ToolSkeleton } from "@/components/tool-skeleton";

// Client-only: the tool seeds state from the Web Crypto API at init.
export const UuidToolIsland = dynamic(
  () => import("./uuid-tool").then((m) => ({ default: m.UuidTool })),
  { ssr: false, loading: () => <ToolSkeleton /> },
);
