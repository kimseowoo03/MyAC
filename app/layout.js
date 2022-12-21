import Header from '../component/Header';
export default function RootLayout({ children }) {
  return (
    <html>
      <head />
      <body>
        <Header />
        {children}
        </body>
    </html>
  )
}
