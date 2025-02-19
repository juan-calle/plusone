import type { ReactNode } from 'react'
import type { LoaderFunction } from 'remix'
import { Links, LiveReload, Meta, Outlet, redirect, Scripts, ScrollRestoration } from 'remix'

import styles from './tailwind.css'

export function links() {
  return [{ rel: 'stylesheet', href: styles }]
}

export const loader: LoaderFunction = ({ request }) => {
  return new URL(request.url).pathname === '/' ? redirect('/welcome') : null
}

export default function App() {
  return (
    <Document title={'Feeds'}>
      <Outlet />
    </Document>
  )
}

function Document({ children, title }: { children: ReactNode; title?: string }) {
  return (
    <html lang={'en'}>
      <head>
        <meta charSet={'utf-8'} />
        {title ? <title>{title}</title> : null}
        <Meta />
        <Links />
      </head>
      <body className={'bg-gray-100'}>
        {children}
        <ScrollRestoration />
        <Scripts />
        {process.env.NODE_ENV === 'development' && <LiveReload />}
      </body>
    </html>
  )
}
