import AppShell from "@/app/appShell";

type LayoutProps = {
    children: React.ReactNode;
};

export default function Layout({ children }: LayoutProps) {
 
    return (
        <AppShell>{children}</AppShell>
    )
}
