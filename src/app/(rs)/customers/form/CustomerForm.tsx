"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form } from "@/components/ui/form"

import { 
    insertCustomerSchema, 
    type insertCustomerSchemaType, 
    type selectCustomerSchemaType 
} from "@/zod-schemas/customer"
import { InputWithLabel } from "@/app/components/inputs/InputWithLabel"
import { SelectWithLabel } from "@/app/components/inputs/SelectWithLabel"
import { StatesArray } from "@/constants/StatesArray"
import { TextAreaWithLabel } from "@/app/components/inputs/TextAreaWithLabel"
import { Button } from "@/components/ui/button"
import { useAction } from 'next-safe-action/hooks'
import { saveCustomerAction } from "@/app/actions/saveCustomerAction"
import { LoaderCircle } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { DisplayServerActionResponse } from "@/app/components/DisplayServerActionResponse"

type Props = {
    customer?: selectCustomerSchemaType,
}

export default function CustomerForm({ customer }: Props){
    const { toast } = useToast();

    const defaultValues: insertCustomerSchemaType = {
        id: customer?.id ?? 0,
        firstName: customer?.firstName ?? '',
        lastName: customer?.lastName ?? '',
        address1: customer?.address1 ?? '',
        address2: customer?.address2 ?? '',
        city: customer?.city ?? '',
        state: customer?.state ?? '',
        zip: customer?.zip ?? '',
        phone: customer?.phone ?? '',
        email: customer?.email ?? '',
        notes: customer?.notes ?? '',
    }

    const form = useForm<insertCustomerSchemaType>({
        mode: 'onBlur',
        resolver: zodResolver(insertCustomerSchema),
        defaultValues,
    })

    const {
        execute: executeSave,
        result: saveResult,
        isPending: isSaving,
        reset: resetSaveAction,
    } = useAction(saveCustomerAction, {
        onSuccess({ data }) {
            if (data?.message) {
                toast({
                    variant: "default",
                    title: "Success! 🎉",
                    description: data.message,
                })
            }
        },
        onError({  }) {
            toast({
                variant: "destructive",
                title: "Error",
                description: "Save Failed",
            })
        }
    })

    async function submitForm(data: insertCustomerSchemaType) {
        executeSave(data)
    }

    return (
        <div className="flex flex-col gap-1 sm:px-8">
            <DisplayServerActionResponse result={saveResult} />
            <div>
                <h2 className="text-2xl font-bold">
                    {customer?.id ? "Edit" : "New"} Customer Form
                </h2>
            </div>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(submitForm)}
                    className="flex flex-col sm:flex-row gap-4 sm:gap-8">

                    <div className="flex flex-col gap-4 w-full max-w-xs">
                        <InputWithLabel<insertCustomerSchemaType>
                            fieldTitle="First Name"
                            nameInSchema="firstName"
                        />
                        <InputWithLabel<insertCustomerSchemaType>
                            fieldTitle="Last Name"
                            nameInSchema="lastName"
                        />
                        <InputWithLabel<insertCustomerSchemaType>
                            fieldTitle="Address 1"
                            nameInSchema="address1"
                        />
                        <InputWithLabel<insertCustomerSchemaType>
                            fieldTitle="Address 2"
                            nameInSchema="address2"
                        />
                         <InputWithLabel<insertCustomerSchemaType>
                            fieldTitle="City"
                            nameInSchema="city"
                        />
                        <SelectWithLabel<insertCustomerSchemaType>
                            fieldTitle="State"
                            nameInSchema="state"
                            data={StatesArray}
                        />
                    </div>
                    <div className="flex flex-col gap-4 w-full max-w-xs">
                        <InputWithLabel<insertCustomerSchemaType>
                            fieldTitle="Zip Code"
                            nameInSchema="zip"
                        />

                        <InputWithLabel<insertCustomerSchemaType>
                            fieldTitle="Email"
                            nameInSchema="email"
                        />
                        <InputWithLabel<insertCustomerSchemaType>
                            fieldTitle="Phone"
                            nameInSchema="phone"
                        />

                        <TextAreaWithLabel<insertCustomerSchemaType>
                            fieldTitle="Notes"
                            nameInSchema="notes"
                            className="h-40"
                        />
                        <div className="flex gap-2">
                            <Button
                                type="submit"
                                className="w-3/4"
                                variant="default"
                                title="Save"
                                disabled={isSaving}
                            >
                                {isSaving ? (
                                    <>
                                        <LoaderCircle className="animate-spin" /> Saving
                                    </>
                                ) : "Save"}
                            </Button>

                            <Button
                                type="button"
                                variant="destructive"
                                title="Reset"
                                onClick={() => {
                                    form.reset(defaultValues)
                                    resetSaveAction()
                                }}
                            >
                                Reset
                            </Button>
                        </div>
                    </div>
                </form>
            </Form>

        </div>
    )
}