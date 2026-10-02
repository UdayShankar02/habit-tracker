import { useState } from "react"
import { Button } from "./button"
import { useHabits } from "../context/useHabits"

export function HabitForm() {
  const [habitName, setHabitName] = useState("")
  const { addHabit } = useHabits()

  function handleSubmit(e: React.SubmitEvent) {
    e.preventDefault()
    if (habitName.trim() === "") {
      return
    }
    setHabitName("")
    addHabit(habitName)
  }

  return (
    <form className="flex gap-2" onSubmit={handleSubmit}>
      <input
        value={habitName}
        onChange={(e) => setHabitName(e.target.value)}
        className="flex-1 rounded-lg bg-zinc-800 px-4 py-2 outline-none focus-visible:ring-2 focus-visible:ring-violet-500"
        placeholder="Enter a new habit..."
      />
      <Button
        disabled={habitName.trim() === ""}
        className="rounded-lg px-4 py-2 font-medium"
      >
        Add Habit
      </Button>
    </form>
  )
}
