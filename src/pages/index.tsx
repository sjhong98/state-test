import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();
  const btn = "bg-white rounded-xl p-12 cursor-pointer";
  const font = "text-black text-[3rem] "

  return (
    <div className="flex flex-col justify-center items-center h-screen w-screen">
      <div className="flex flex-row space-x-20">
        <div className={btn} onClick={() => router.push('/redux-toolkit-memo')}>
          <p className={font}>Redux Toolkit</p>
        </div>
        <div className={btn} onClick={() => router.push('/recoil-todo')}>
          <p className={font}>Recoil</p>
        </div>
        <div className={btn} onClick={() => router.push('/zustand-tetris')}>
          <p className={font}>Zustand</p>
        </div>
      </div>
      <p className="text-[3rem] mt-20">+ Next.js, Typescript</p>
    </div>
  )
}
