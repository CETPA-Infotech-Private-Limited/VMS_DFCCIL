import React from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { DayPicker } from 'react-day-picker'
import { cn } from '@/lib/utils'
import { buttonVariants } from '@/components/ui/button'

export type CalendarProps = React.ComponentProps<typeof DayPicker> & {
  disableWeekends?: boolean
  holidays?: Date[] // Array of holiday dates
  value?: Date | null // The selected date
  onSelect?: (date: Date | undefined) => void // Callback for when a date is selected
  minDate?: Date // Minimum selectable date
  maxDate?: Date // Maximum selectable date
}

function CustomCalendar({
  className,
  classNames,
  showOutsideDays = true,
  disableWeekends = false,
  holidays = [],
  value,
  onSelect,
  minDate,
  maxDate,
  ...props
}: CalendarProps) {
  return (
    <div className="w-full max-w-full p-4">
      <DayPicker
        mode="single"
        selected={value} // Highlight the selected date
        onSelect={onSelect} // Callback for updating the selected date
        showOutsideDays={showOutsideDays}
        className={cn('w-full p-3', className)} // Ensure full width
        classNames={{
          months: 'flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0 w-full',
          month: 'space-y-4 w-full',
          caption: 'flex justify-center pt-1 relative items-center',
          caption_label: 'text-sm font-medium',
          nav: 'space-x-1 flex items-center',
          nav_button: cn(buttonVariants({ variant: 'outline' }), 'h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100'),
          nav_button_previous: 'absolute left-1',
          nav_button_next: 'absolute right-1',
          table: 'w-full border-collapse',
          head_row: 'grid grid-cols-7 gap-0',
          head_cell: 'text-muted-foreground text-center rounded-md font-normal text-[0.8rem] h-10 w-full',
          row: 'grid grid-cols-7 gap-0 w-full',
          cell: 'h-10 w-full text-center text-sm p-0 relative rounded-md focus-within:z-20 focus-within:relative [&:has([aria-selected])]:bg-accent',
          day: cn(buttonVariants({ variant: 'ghost' }), 'h-10 w-full p-0 font-normal aria-selected:bg-primary aria-selected:text-primary-foreground'),
          day_selected: 'bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground',
          day_today: 'bg-accent text-accent-foreground',
          day_outside: 'text-muted-foreground opacity-50',
          day_disabled: 'text-muted-foreground opacity-50 cursor-not-allowed',
          ...classNames
        }}
        components={{
          IconLeft: ({ className, ...props }) => <ChevronLeft className={cn('h-4 w-4', className)} {...props} />,
          IconRight: ({ className, ...props }) => <ChevronRight className={cn('h-4 w-4', className)} {...props} />
        }}
        disabled={[
          ...(disableWeekends ? [{ dayOfWeek: [0, 6] }] : []), // Disable weekends if specified
          ...holidays, // Disable holiday dates
          {
            before: minDate, // Disable dates before minDate
            after: maxDate // Disable dates after maxDate
          }
        ]}
        {...props}
      />
    </div>
  )
}
CustomCalendar.displayName = 'CustomCalendar'

export { CustomCalendar }
