import { NextResponse } from "next/server";
import { exec } from "child_process";
import path from "path";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  try {
    const scriptPath = path.join(process.cwd(), "scripts", "sync-legistar-live.py");
    
    return new Promise<NextResponse>((resolve) => {
      exec(`python3 "${scriptPath}"`, (error, stdout, stderr) => {
        if (error) {
          console.error("Sync API Error:", error, stderr);
          return resolve(
            NextResponse.json(
              {
                success: false,
                error: error.message,
                stderr: stderr
              },
              { status: 500 }
            )
          );
        }

        return resolve(
          NextResponse.json({
            success: true,
            message: "Legistar sync completed successfully",
            output: stdout.trim(),
            timestamp: new Date().toISOString()
          })
        );
      });
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}
