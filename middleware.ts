import { NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
  const basicAuth = req.headers.get('authorization');
  const url = req.nextUrl;

  if (process.env.NODE_ENV === 'production') {
    if (basicAuth) {
      const authValue = basicAuth.split(' ')[1];
      const [user, pwd] = atob(authValue).split(':');

      if (user === 'Recruiter' && pwd === process.env.RECRUITER_PW) {
        return NextResponse.next();
      } else if (user === 'Owner' && pwd === process.env.OWNER_PW) {
        return NextResponse.next();
      }
    }
    url.pathname = '/api/auth';

    return NextResponse.rewrite(url);
  }
}
