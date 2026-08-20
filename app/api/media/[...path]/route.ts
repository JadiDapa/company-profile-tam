export const runtime = "nodejs";

import { NextRequest, NextResponse } from "next/server";
import path from "path";
import { promises as fs } from "fs";
import { prisma } from "@/lib/prisma";

export async function GET(
  _req: NextRequest,
  context: { params: Promise<{ path: string[] }> },
) {
  const { path: mediaPath } = await context.params;

  const filePath = path.join(process.cwd(), "media", ...mediaPath);
  const filename = mediaPath[mediaPath.length - 1];

  try {
    const file = await fs.readFile(filePath);
    const media = await prisma.media.findFirst({ where: { filename } });

    return new NextResponse(file, {
      headers: {
        "Content-Type": media?.mimeType ?? "application/octet-stream",
        "Cache-Control": "public, max-age=86400",
      },
    });
  } catch (err) {
    console.error("FILE ERROR:", err);
    return NextResponse.json({ error: "File not found" }, { status: 404 });
  }
}
