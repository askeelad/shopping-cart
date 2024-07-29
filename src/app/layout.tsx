import NavBar from "@/components/NavBar";
import "./globals.css";
import Providers from "@/components/providers";
import Footer from "@/components/footer";
export const metadata = {
  title: "Shopping Cart",
  desccription: "Discover & Buy awesome products",
};
const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang="en">
      <body>
        <div className="main">
          <div className="gradient" />
        </div>

        <main className="app">
          <div className="container md:mx-auto">
            <Providers>
              <NavBar />
              {children}
              <Footer />
            </Providers>
          </div>
        </main>
      </body>
    </html>
  );
};

export default RootLayout;
