export function BackgroundEffects() {
  return (
    <>
      {/* Elegant Gradient Background */}
      <div className="fixed inset-0 -z-20 bg-gradient-to-br from-pink-50/20 via-transparent to-purple-100/20 dark:from-pink-950/20 dark:via-transparent dark:to-purple-900/20" />

      {/* Gradient overlay */}
      <div
        className="absolute inset-0 -z-10 h-1/2 bg-[radial-gradient(50%_150%_at_50%_0%,rgba(120,119,198,0.15)_0,rgba(255,255,255,0)_100%)] dark:bg-[radial-gradient(50%_150%_at_50%_0%,rgba(120,119,198,0.12)_0,rgba(0,0,0,0)_100%)]"
        aria-hidden="true"
      />

      {/* Pattern Background */}
      <div
        className="fixed inset-0 -z-10 opacity-90"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20 0v20H0V0h20ZM1 1v18h18V1H1Z' fill='%239C92AC' fill-opacity='0.05'/%3E%3C/svg%3E")`,
          backgroundSize: '20px 20px',
        }}
      />
    </>
  )
}
