// API endpoint that returns the recent sessions.

import { NextRequest, NextResponse } from "next/server";
import { pool } from "@/lib/db";
import { GET } from "@/app/api/sessions/route";

export async function DashboardGET(request: NextRequest) {
    return GET(request);
}