// import Sidebar from "@/components/global/layout/sidebar";

export default async function Layout({ children }: { children: React.ReactNode }) {

    return (
        <main className="flex">
            {/* <Sidebar /> */}
            {children}
            
        </main>
    )
}
