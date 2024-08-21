import Main from "./_components/Main"

export default function RestuarantLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return (
        <>
        <Main>
          <section className="flex flex-1 flex-col justify-center items-center">
              {children}
          </section>
        </Main>
        </>
    )
  }
  