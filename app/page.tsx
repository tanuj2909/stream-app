import Image from "next/image";
import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";
export default function Home() {
  return (
    <div className="flex flex-col dap-y-4">
      <h1>Dashboard</h1>
      <UserButton 
        afterSignOutUrl="/"
      />
    </div>
    
  );
}
