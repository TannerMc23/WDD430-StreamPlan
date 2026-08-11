export default function Header() {
    return (
        <header className="bg-black text-white p-4 flex flex-wrap items-center justify-between gap-2">
            <div id="header-title" className="text-xl font-bold">
                <h1>StreamPlan</h1>
            </div>
            <p className="text-sm sm:text-xl font-bold">{new Date().getDate()}/{new Date().getMonth() + 1}/{new Date().getFullYear()}</p>
        </header>
  );
}