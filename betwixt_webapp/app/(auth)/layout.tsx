export default function AuthLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return <section className="flex flex-1">{children}</section>
  }
  