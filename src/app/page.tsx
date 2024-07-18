import Header from "@/components/Header"
import UsersTable from "@/components/UsersTable"
import Tasks from "@/components/Tasks"
import InfoCard from "@/components/InfoCard"

export default function Home() {
  return (
    <div className="flex min-h-screen w-full flex-col dark">
      <Header />
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8 bg-background">
        <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
          <InfoCard />
        </div>
        <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
          <UsersTable />
          <Tasks />
        </div>
      </main>
    </div>
  );
}
