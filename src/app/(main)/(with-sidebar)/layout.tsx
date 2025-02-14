// import Sidebar from "@/components/global/layout/sidebar";

export default async function Layout({ children }: { children: React.ReactNode }) {

    return (
        // flex class should be added here when sidebar is needed
        <main className="">
            {/* <Sidebar /> */}
            {children}
            
        </main>
    )
}
