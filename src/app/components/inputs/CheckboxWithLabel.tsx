"use client"

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Checkbox } from "@radix-ui/react-checkbox"
import { useFormContext } from "react-hook-form"

type Props<S> = {
    fieldTitle: string,
    nameInSchema: keyof S & string,
    message: string,
}

export function CheckboxWithLabel<S>({
    fieldTitle, nameInSchema, message
}: Props<S>) {
    const form = useFormContext()

    return (
        <FormField
            control={form.control}
            name={nameInSchema}
            render={({ field }) => (
                <FormItem className="w-full flex items-center gap-2">
                    <FormLabel
                        className="text-base w-1/3 mt-2"
                        htmlFor={nameInSchema}
                    >
                        {fieldTitle}
                    </FormLabel>

                    <div className="flex items-center gap-2">
                        <FormControl>
                            <Checkbox
                                id={nameInSchema}
                                {...field}
                                checked={field.value}
                                onCheckedChange={field.onChange}
                            />
                        </FormControl>
                        {message}
                    </div>

                    <FormMessage />
                </FormItem>
            )}
        />
    )
}