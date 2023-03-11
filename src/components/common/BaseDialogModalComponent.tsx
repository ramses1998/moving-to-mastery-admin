import React from "react";
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogProps,
    DialogTitle,
    IconButton,
    TextField
} from "@mui/material";
import {FormFieldType} from "../../helpers/forms";
import Autocomplete from "@mui/material/Autocomplete";

type Props = {
    title: React.ReactNode
    fields: FormFieldType[]
    toggleButtonProps: {icon?: any, label?: React.ReactNode}
    onSubmit: () => void
    onClose?: () => void
}
export const BaseDialogModalComponent: React.FC<Props> = (props: Props) => {

    const [open, setOpen] = React.useState(false);
    const [scroll, setScroll] = React.useState<DialogProps['scroll']>('paper');

    const handleClickOpen = (scrollType: DialogProps['scroll']) => () => {
        setOpen(true);
        setScroll(scrollType);
    }

    const handleClose = () => {
        setOpen(false)
        props.onClose !== undefined && props.onClose()
    }

    const handleOnSubmit = () => {
        props.onSubmit()
        handleClose()
    }

    const descriptionElementRef = React.useRef<HTMLElement>(null);
    React.useEffect(() => {
        if (open) {
            const { current: descriptionElement } = descriptionElementRef;
            if (descriptionElement !== null) {
                descriptionElement.focus();
            }
        }
    }, [open]);

    return (
        <div>
            {props.toggleButtonProps.label === undefined ?
                <IconButton sx={{border: "2px solid gray"}} onClick={handleClickOpen("paper")}>
                    {props.toggleButtonProps.icon}
                </IconButton>
                :
                <Button
                    variant="outlined"
                    size="small"
                    startIcon={props.toggleButtonProps.icon}
                    onClick={handleClickOpen("paper")}
                >
                    {props.toggleButtonProps.label}
                </Button>
            }
            <Dialog
                open={open}
                onClose={handleClose}
                scroll={scroll}
                fullWidth={true}
            >
                <DialogTitle>{props.title}</DialogTitle>
                <DialogContent dividers={scroll === 'paper'}>
                    <Box
                        sx={{
                            display: "grid",
                            gridGap: 25,
                            mt: 2,
                            mb: 2,
                        }}
                    >
                        {props.fields.map((field, idx) => {
                                if (field.type === "dropdown") {
                                    return <Autocomplete
                                        key={idx}
                                        disablePortal
                                        options={field.options}
                                        value={field.value}
                                        size="small"
                                        disabled={field.disabled}
                                        onChange={(event, value) => field.onChange!(field.name, event, value)}
                                        renderInput={(params) =>
                                            <TextField
                                                {...params}
                                                size="small"
                                                label={field.label}
                                                type={field.type}
                                                name={field.name}
                                                value={field.value}
                                                placeholder={field.placeholder}
                                                required={field.required}
                                            />
                                        }
                                    />
                                }
                                return <TextField
                                    key={idx}
                                    sx={{ width: "100%", }}
                                    size="small"
                                    label={field.label}
                                    type={field.type}
                                    name={field.name}
                                    value={field.value}
                                    disabled={field.disabled}
                                    multiline={field.multiline}
                                    placeholder={field.placeholder}
                                    required={field.required}
                                    onChange={(event) => field.onChange!(field.name, event)}
                                />
                            }
                        )}
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={handleClose}
                        variant="outlined"
                        size="small"
                    >
                        Annuler
                    </Button>
                    <Button
                        onClick={handleOnSubmit}
                        variant="outlined"
                        size="small"
                    >
                        Valider
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}
