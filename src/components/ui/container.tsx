import * as React from 'react'

const Container = ({ children }: { children: any }) => (
  <div className="mt-2 overflow-hidden rounded-[0.5rem] border bg-[rgba(255,255,255,0.4)] p-6 shadow-md sm:p-8 md:shadow">
    {children}
  </div>
)

Container.displayName = 'Container'

export { Container }
