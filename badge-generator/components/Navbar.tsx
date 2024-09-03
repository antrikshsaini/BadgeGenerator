import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto">
        <Link href="/superuser">
          <div className="text-white mx-4">Superuser Dashboard</div>
        </Link>
        <Link href="/organiser">
          <div className="text-white mx-4">Organiser Dashboard</div>
        </Link>
      </div>
    </nav>
  );
}
