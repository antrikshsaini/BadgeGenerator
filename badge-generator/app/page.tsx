import LoginPage from "./login/page";

export default function Home() {
  return (
    <div>
      <div className="container mx-auto p-8">
        <h1 className="text-4xl mb-4">Welcome to the Badge Organizer</h1>
      </div>
      <LoginPage />
    </div>
  );
}
