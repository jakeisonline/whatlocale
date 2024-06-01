"use client"

import useSelectedLocaleContext from "@/hooks/use-selected-locale-context"
import { ChevronsUpDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { LOCALES } from "@/lib/const"
import { useState } from "react"

export default function LocaleSelection() {
  const [open, setOpen] = useState(false)
  const { selectedLocale, handleSelectedLocaleChange } =
    useSelectedLocaleContext()

  return (
    <div className="mx-auto py-8">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="text-md w-[400px] justify-between border-black/20 dark:border-white/20"
          >
            {selectedLocale
              ? LOCALES.find((locale) => locale.value === selectedLocale)?.label
              : "Select locale..."}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[400px] bg-[#ECECE6] p-0 dark:bg-[#1B1D23]">
          <Command>
            <CommandInput placeholder="Search locales..." />
            <CommandList className="">
              <CommandEmpty>No framework found.</CommandEmpty>
              <CommandGroup>
                {LOCALES.map((locale) => (
                  <CommandItem
                    key={locale.value}
                    value={locale.value}
                    keywords={[locale.label]}
                    onSelect={(currentValue) => {
                      handleSelectedLocaleChange(
                        currentValue === selectedLocale ? "" : currentValue,
                      )
                      setOpen(false)
                    }}
                    className="flex-col items-start hover:cursor-pointer hover:bg-black/10 dark:hover:bg-white/10"
                  >
                    <p className="block">{locale.label}</p>
                    <p className="block text-black/40 dark:text-white/60">
                      {locale.value}
                    </p>
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  )
}
