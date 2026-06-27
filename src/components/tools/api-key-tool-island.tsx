"use client";

import dynamic from "next/dynamic";
import { ToolSkeleton } from "@/components/tool-skeleton";

export const ApiKeyToolIsland = dynamic(
  () => import("./api-key-tool").then((m) => ({ default: m.ApiKeyTool })),
  { ssr: false, loading: () => <ToolSkeleton /> },
);
