import Footer from '@/components/core/Footer';
import Loader from '@/components/core/Loader';
import { Providers } from '@/redux/provider';
import '@/styles/global.scss'


export const metadata = {
  title: "Cheque Handover Services : Shubham Finance",
  description: "Shubham is a leader in providing housing finance solutions to those with informal incomes. We are amongst the first organizations in India to evolve from document-based underwriting to customized credit programs for each customer and have become a leading home loan provider to borrowers without formal income.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
        <link rel="icon" href="/favicon/favicon.ico" sizes="any" />
      </head>
      <body suppressHydrationWarning={true}>
        <Providers>
          <Loader />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
