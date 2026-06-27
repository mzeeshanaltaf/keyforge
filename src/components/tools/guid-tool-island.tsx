"use client";

import dynamic from "next/dynamic";
import { ToolSkeleton } from "@/components/tool-skeleton";

export const GuidToolIsland = dynamic(
  () => import("./guid-tool").then((m) => ({ default: m.GuidTool })),
  { ssr: false, loading: () => <ToolSkeleton /> },
);
