"use client";

import dynamic from "next/dynamic";
import { ToolSkeleton } from "@/components/tool-skeleton";

export const PasswordToolIsland = dynamic(
  () => import("./password-tool").then((m) => ({ default: m.PasswordTool })),
  { ssr: false, loading: () => <ToolSkeleton /> },
);
