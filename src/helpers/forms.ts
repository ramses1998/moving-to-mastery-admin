export type CustomInputType = "text" | "dropdown" | "number" | "tel"

export type FormFieldType = {
    label?: string
    value?: any
    name?: string
    type?: CustomInputType
    options?: any
    placeholder?: string
    multiline?: boolean
    required?: boolean
    disabled?: boolean
    onChange?: (...args: any[]) => void
}
