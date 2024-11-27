import Head from 'next/head'
import TaskList from '../components/TaskList'
import ThemeToggle from '../components/ThemeToggle'

export default function Home() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 dark:text-white">
      <Head>
        <title>Priorizador de Tarefas</title>
        <meta name="description" content="Priority-based task manager" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="max-w-2xl mx-auto p-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">Priorizador de Tarefas</h1>
          <ThemeToggle />
        </div>
        <TaskList />
      </main>
    </div>
  )
}
