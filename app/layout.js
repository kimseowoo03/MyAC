export default function RootLayout({ children }) {
  return (
    <html>
      <head />
      <body>
        <p>레이아웃으로 감싸기</p>
        {children}
        </body>
    </html>
  )
}
