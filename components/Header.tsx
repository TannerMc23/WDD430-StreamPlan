export default function Header() {
    return (
        <header className="bg-black text-white p-4 flex justify-between">
            <div id="header-title" className="text-xl font-bold">
                <h1>StreamPlan</h1>
            </div>
            <p className="text-xl font-bold">{new Date().getDate()}/{new Date().getMonth() + 1}/{new Date().getFullYear()}</p>
        </header>
  );
}