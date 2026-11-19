import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    ok: true,
    app: "rc-dns-lab",
    mode: "setup",
    dns: "not_configured",
    revenuecat: "sandbox_not_configured",
    timestamp: new Date().toISOString(),
  });
}
