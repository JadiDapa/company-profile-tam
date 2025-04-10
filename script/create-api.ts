#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

// Get arguments
const [routeName, modelName] = process.argv.slice(2);

if (!routeName || !modelName) {
  console.error("❌ Please provide both routeName and modelName.");
  console.error("Usage: node scripts/generate-api.js users User");
  process.exit(1);
}

// Paths
const baseDir = path.resolve(__dirname, "../app/api");
const normalPath = path.join(baseDir, routeName, "route.ts");
const paramPath = path.join(baseDir, `[${routeName}]`, "route.ts");

// Template replacements
const normalRouteTemplate = `import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
export const prisma = new PrismaClient();

export async function GET() {
  try {
    const result = await prisma.${modelName}.findMany({
      orderBy: {
        id: "desc",
      },
    });

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Something went wrong!", error },
      { status: 500 },
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();

    if (!Array.isArray(data)) {
      return NextResponse.json(
        { message: "Invalid data format. Expected an array." },
        { status: 400 },
      );
    }

    const result = await prisma.${modelName}.createMany({
      data,
    });

    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    if (error instanceof Error) {
      console.log("Error: ", error.stack);
    }
    return NextResponse.json(
      { message: "Something went wrong!", error },
      { status: 500 },
    );
  }
}
`;

const parameterRouteTemplate = `import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  request: Request,
  { params }: { params: { ${routeName}: string } },
) {
  try {
    const ${routeName} = params.${routeName};
    const result = await prisma.${modelName}.findUnique({
      where: {
        id: ${routeName},
      },
      include: {
        Item: true,
      },
    });
    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      console.log("Error: ", error.stack);
    }
    return NextResponse.json(
      { message: "Something went wrong!", error },
      { status: 500 },
    );
  }
}

export async function PUT(
  req: Request,
  { params }: { params: { ${routeName}: string } },
) {
  try {
    const ${routeName} = params.${routeName};
    const data = await req.json();

    const result = await prisma.${modelName}.update({
      where: {
        id: ${routeName},
      },
      data: data,
    });

    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    if (error instanceof Error) {
      console.log("Error: ", error.stack);
    }
    return NextResponse.json(
      { message: "Something went wrong!", error },
      { status: 500 },
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { ${routeName}: string } },
) {
  try {
    const ${routeName} = params.${routeName};
    const result = await prisma.${modelName}.delete({
      where: {
        id: ${routeName},
      },
    });
    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      console.log("Error: ", error.stack);
    }
    return NextResponse.json(
      { message: "Something went wrong!", error },
      { status: 500 },
    );
  }
}
`;

// Create normal route
fs.mkdirSync(path.dirname(normalPath), { recursive: true });
fs.writeFileSync(normalPath, normalRouteTemplate, "utf8");

// Create parameter route
fs.mkdirSync(path.dirname(paramPath), { recursive: true });
fs.writeFileSync(paramPath, parameterRouteTemplate, "utf8");

console.log(`✅ API routes created for '${modelName}' at:`);
console.log(`  - ${path.relative(process.cwd(), normalPath)}`);
console.log(`  - ${path.relative(process.cwd(), paramPath)}`);
