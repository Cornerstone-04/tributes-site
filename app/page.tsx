import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="bg-background text-foreground min-h-screen p-10">
      <h1 className="text-4xl font-serif text-primary">
        Celebrating 100 Years
      </h1>

      <Button
        size="lg"
        className="mt-6 bg-accent text-accent-foreground px-6 py-3 rounded-lg"
      >
        Write a Tribute
      </Button>
    </div>
  );
}
