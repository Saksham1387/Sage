import Image from 'next/image'
export function Navbar() {
  return (
    <div className="w-full bg-white text-white h-20 flex items-center justify-center">
      <div>
        <button
          onClick={() => {
            window.location.reload();
          }}
        >
          <Image alt="logo" src="/logo.png" className="h-[300px] w-[300px]"></Image>
        </button>
      </div>
    </div>
  );
}
