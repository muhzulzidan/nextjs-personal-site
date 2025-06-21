"use client"

import { usePathname } from "next/navigation";
import Stars from "./Stars";


export default function StarRoot() {
    const pathname = usePathname();

    return (
    <>
            {pathname !== '/' && (
                <Stars
                    normalVelocity={0.0001}
                    containerOpacity={0.3}
                    addEventListeners={false}
                />
            )}

    </>
    )
}