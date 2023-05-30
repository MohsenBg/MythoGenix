import dynamic from "next/dynamic";
import React from "react";
import { Control } from "react-hook-form";

interface Props {
  control: Control<any, any>;
}

enum AppStatus {
  DEV = "development",
  PRODUCTION = "production",
}

const env = process.env.NODE_ENV;

const DevT = dynamic(
  () => import("@hookform/devtools").then((module) => module.DevTool),
  {
    ssr: false,
  }
);

export default function FormHookDev({ control }: Props) {
  //@ts-ignore
  return env === AppStatus.DEV ? <DevT control={control} /> : null;
}
