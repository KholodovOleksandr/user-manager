import * as React from "react"
import { DayPicker } from "react-day-picker"
import { cn } from "@/lib/utils"

import "react-day-picker/dist/style.css"

export type CalendarProps = React.ComponentProps<typeof DayPicker>

function Calendar({ className, classNames, ...props }: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays
      className={cn("p-3", className)}
      classNames={{
        months: "flex flex-col sm:flex-row",
        month: "space-y-4 sm:space-y-0 sm:space-x-4",
        caption: "flex justify-center items-center",
        caption_label: "text-sm font-medium",
        nav: "space-x-1 flex items-center",
        nav_button: "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100",
        table: "w-full border-collapse",
        head_row: "flex",
        head_cell: "text-muted-foreground w-9 text-xs",
        row: "flex",
        cell: "text-center text-sm w-9 h-9 p-0 relative focus-within:relative",
        day: "h-9 w-9 p-0 font-normal",
        day_selected: "bg-primary text-white hover:bg-primary/90",
        day_today: "border border-primary",
        day_outside: "text-muted-foreground opacity-50",
        day_disabled: "text-muted-foreground opacity-50",
        day_range_middle: "bg-muted text-muted-foreground",
        day_hidden: "invisible",
        ...classNames,
      }}
      {...props}
    />
  )
}

export { Calendar }
