export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-background font-sans">
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-background sm:items-start">
        <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
          <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-foreground">
            Welcome to StreamPlan!
          </h1>
          <p className="max-w-md text-lg leading-8 text-foreground">
            To get started, log in or create an account. You can keep track of your streams and how you want them to go all in one place.
          </p>
        </div>
      </main>
    </div>
  );
}
