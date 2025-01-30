import type { Metadata } from "next";
// import localFont from "next/font/local";
import "../globals.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Type Imports
import type { ChildrenType } from "@/types/types";
import type { Locale } from "@/configs/i18n";

// HOC Imports
import TranslationWrapper from "@/hocs/TranslationWrapper";

// Config Imports
import { i18n } from "@/configs/i18n";
import { headers } from "next/headers";

// const geistSans = localFont({
//   src: "./fonts/GeistVF.woff",
//   variable: "--font-geist-sans",
//   weight: "100 900",
// });
// const geistMono = localFont({
//   src: "./fonts/GeistMonoVF.woff",
//   variable: "--font-geist-mono",
//   weight: "100 900",
// });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

const RootLayout = async ({
  children,
  params,
}: ChildrenType & { params: { lang: Locale } }) => {
  // Vars
  const { lang: locale } = await params;

  const headersList = headers();
  const direction = await i18n.langDirection[locale];

  return (
    <TranslationWrapper headersList={headersList} lang={locale}>
      <html id="__next" lang={locale} dir={direction}>
        <body className="">
          <ToastContainer />
          {children}
        </body>
      </html>
    </TranslationWrapper>
  );
};

export default RootLayout;
