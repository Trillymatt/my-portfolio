import { ImageResponse } from "next/og"
import { NextRequest } from "next/server"

export const runtime = "edge"

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const title = searchParams.get("title") ?? "Matthew Norman"
  const description = searchParams.get("desc") ?? "Software Engineer & Entrepreneur"
  const mode = searchParams.get("mode") ?? "business"

  const accentColor = mode === "professional" ? "#6366f1" : "#06b6d4"
  const bgColor = mode === "professional" ? "#0f0a1e" : "#0b1b2b"
  const accentGlow = mode === "professional" ? "rgba(99,102,241,0.3)" : "rgba(6,182,212,0.3)"

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: bgColor,
          backgroundImage: `radial-gradient(circle at 25px 25px, rgba(255,255,255,0.03) 2%, transparent 0%)`,
          backgroundSize: "50px 50px",
          fontFamily: "Inter, sans-serif",
        }}
      >
        {/* Glow effect */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "600px",
            height: "600px",
            borderRadius: "50%",
            background: `radial-gradient(circle, ${accentGlow} 0%, transparent 70%)`,
          }}
        />

        {/* Content card */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "48px 80px",
            borderRadius: "24px",
            border: `1px solid ${accentColor}40`,
            backgroundColor: "rgba(255,255,255,0.05)",
            backdropFilter: "blur(20px)",
          }}
        >
          {/* Name */}
          <div
            style={{
              fontSize: 64,
              fontWeight: 800,
              color: "white",
              letterSpacing: "-0.03em",
              lineHeight: 1.1,
              textAlign: "center",
            }}
          >
            {title}
          </div>

          {/* Description */}
          <div
            style={{
              fontSize: 28,
              color: accentColor,
              marginTop: "16px",
              textAlign: "center",
              fontWeight: 500,
            }}
          >
            {description}
          </div>

          {/* Mode indicator */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              marginTop: "32px",
              padding: "8px 20px",
              borderRadius: "100px",
              backgroundColor: `${accentColor}20`,
              border: `1px solid ${accentColor}40`,
            }}
          >
            <div
              style={{
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                backgroundColor: accentColor,
              }}
            />
            <div
              style={{
                fontSize: 16,
                color: "rgba(255,255,255,0.7)",
                textTransform: "capitalize",
              }}
            >
              {mode} Mode
            </div>
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  )
}
