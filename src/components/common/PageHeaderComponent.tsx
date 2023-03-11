import React from "react";
import {Box, Typography} from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";

type Props = {
    title: string
    onClick?: () => void
}
export const PageHeaderComponent: React.FC<Props> = (props: Props) => {
    return (
        <Box
            sx={{
                display: "grid",
                gap: 1,
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    justifyContent:"start",
                    justifySelf: "start",
                    "&:hover": {
                        cursor: "pointer",
                    },
                }}
                onClick={props.onClick}
            >
                <ArrowBackIosNewIcon fontSize={"small"} sx={{color: "#1976d2"}}/>
                <Typography variant={"h5"} sx={{fontWeight: "bold", fontSize: 18, color: "#1976d2"}}>
                    Retour
                </Typography>
            </Box>
            <Typography variant={"h5"} sx={{fontWeight: "bold"}}>{props.title}</Typography>
        </Box>
    )
}
