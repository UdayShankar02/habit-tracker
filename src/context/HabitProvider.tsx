import { isSameDay } from "date-fns"
import { HabitContext, type Habit } from "./useHabits"
import { useLocalStorage } from "../hooks/useLocalStorage"

type HabitProviderProps = {
  children: React.ReactNode
}

export function HabitProvider({ children }: HabitProviderProps) {
  const [habits, setHabits] = useLocalStorage<Habit[]>("habits", [])

  function addHabit(name: string) {
    setHabits((curr) => [
      ...curr,
      { id: crypto.randomUUID(), name, completions: [] },
    ])
  }

  function deleteHabit(id: string) {
    setHabits((curr) => curr.filter((habit) => habit.id !== id))
  }

  function toggleHabit(id: string, date: Date) {
    setHabits((curr) =>
      curr.map((habit) => {
        if (habit.id !== id) return habit

        const isCompleted = habit.completions.some((d) => isSameDay(d, date))
        const completions = isCompleted
          ? habit.completions.filter((d) => !isSameDay(d, date))
          : [...habit.completions, date]

        return { ...habit, completions }
      }),
    )
  }

  return (
    <HabitContext value={{ habits, addHabit, deleteHabit, toggleHabit }}>
      {children}
    </HabitContext>
  )
}
