export default function Footer() {
    return (
        <footer className="bg-black text-white p-4">
            <div className="container mx-auto text-center">
                <p>Copyright &copy; {new Date().getFullYear()} | SteamPlan | All rights reserved.</p>
            </div>    
        </footer>
  );
}