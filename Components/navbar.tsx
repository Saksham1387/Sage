import { useRouter } from "next/navigation";

export function Navbar() {
  const route = useRouter()
  return (
    <div className="w-full bg-white text-white h-20 flex items-center justify-center">
      <div>
        <button onClick={()=>{
         window.location.reload()
        }}>
        <img alt="logo" src="/logo.png" className="h-[300px] w-[300px]"></img>
        </button>
      </div>
    </div>
  );
}
