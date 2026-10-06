import { createEnv } from "@t3-oss/env-nextjs";

export const env = createEnv({
    server: {},
    experimental__runtimeEnv: import.meta.env || process.env,
    emptyStringAsUndefined: true
})