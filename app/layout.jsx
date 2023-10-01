import './global.css';
import { Inter } from "next/font/google";
import { UserProvider } from "../context/UserContext";
import NavBar from '../components/Nav/NavBar';
import Footer from '../components/Nav/Footer';

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
    title: "Create Next App",
    description: "Generated by create next app",
};

export default function RootLayout({ children }) {
    return (
        <UserProvider>
            <html lang="en">
                <body suppressHydrationWarning={true} className={`${inter.className} bg-info text-white`}>     
                    <NavBar />               
                    {children}
                    <Footer />
                </body>
            </html>
        </UserProvider>
    );
}
