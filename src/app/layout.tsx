import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Aditya Kumar | Full Stack Developer",
  description:
    "Portfolio of Aditya Kumar, a Computer Science student at IIIT Sonepat building full-stack web applications and exploring AI/ML.",
  openGraph: {
    title: "Aditya Kumar | Full Stack Developer",
    description:
      "Projects, skills, education, and contact details for Aditya Kumar.",
    type: "website",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
