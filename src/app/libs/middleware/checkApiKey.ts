// lib/middleware/withApiKey.ts
import { NextRequest, NextResponse } from 'next/server'

export function withApiKey(handler: (req: NextRequest) => Promise<Response>) {
  return async (req: NextRequest) => {
    const keyFromHeader = req.headers.get('cplexx-api-key')
    const validKey = process.env.API_KEY

    if (keyFromHeader !== validKey) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    return handler(req)
  }
}
