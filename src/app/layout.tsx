import "./globals.css";
import SidebarComponent from './components/Sidebar'; 
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <SidebarComponent> 
          {children} 
        </SidebarComponent>
      </body>
    </html>
  );
}
