import {NextRequest, NextResponse} from "next/server"

export const middleware = async (req: NextRequest) => {
  // NOTE: NextAuth(ver.5)でmiddlewareでもgetServerSessionが使えるようになるまでの応急処置
  const res = await fetch(`${req.nextUrl.origin}/api/auth/session`, {
    method: "GET",
    headers: req.headers,
  })
  const session = await res.json()
  if (!session) return

  if (session.user.finishInit && !req.nextUrl.pathname.startsWith("/auth/init")) {
    return NextResponse.rewrite(new URL("/auth/init", req.url))
  }
}

export const config = {
  matcher: "/(!api)/(.*)"
}
