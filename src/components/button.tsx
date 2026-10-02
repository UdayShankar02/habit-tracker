import { twMerge } from "tailwind-merge"

type Variant = "primary" | "secondary" | "delete"

type ButtonProps = {
  variant?: Variant
} & React.ComponentProps<"button">

export function Button({
  variant = "primary",
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      className={twMerge(
        "transition-colors rounded px-2 py-1 disabled:opacity-30 disabled:cursor-not-allowed",
        getVariantStyles(variant),
        className,
      )}
    />
  )
}

function getVariantStyles(variant: Variant) {
  switch (variant) {
    case "primary":
      return "bg-violet-500 hover:bg-violet-600"
    case "secondary":
      return "bg-zinc-600 hover:bg-zinc-700 text-zinc-300"
    case "delete":
      return "bg-red-800 hover:bg-red-600 text-white"
    default:
      throw new Error(`Unknown variant: ${variant satisfies never}`)
  }
}
