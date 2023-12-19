import {getServerSession} from "next-auth"
import {nextAuthOptions} from "@/lib/next-auth"

export default async function Home() {
  const user = await getServerSession(nextAuthOptions)

  return (
    <main>
      <h1>sns-app</h1>

      <p>{JSON.stringify(user)}</p>
    </main>
  )
}
