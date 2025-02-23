import { Button } from "@/components/ui/button";
import Link from "next/link";


export default function LoginButton (){
    return (
        
            <Link href={'/login'}>
                <Button className=" py-2 px-4 h-[42px] text-white font-semibold">
                Login
            </Button>
            </Link>

    )
}