export function Navbar() {
  return (
    <div className="w-full bg-white text-white h-20 flex items-center justify-center">
      <div>
        <button
          onClick={() => {
            window.location.reload();
          }}
        >
          <img alt="logo" src="/logo.png" className="h-[300px] w-[300px]" width={300} height={300}></img>
        </button>
      </div>
    </div>
  );
}
