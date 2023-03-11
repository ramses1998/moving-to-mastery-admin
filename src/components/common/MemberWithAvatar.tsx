import React from "react";
import {Member} from "../../api/members";
import {Avatar, Box, Typography} from "@mui/material";

type Props = {
    member:  Member
}
export const MemberWithAvatar: React.FC<Props> = (props: Props) => {

    const {member} = props

    return (
        <Box
            sx={{
                display: "flex",
                gap: 1,
                alignItems: "center",
            }}
        >
            <Avatar
                alt={member?.firstName + " " + member?.lastName}
                src={member?.avatar}
                children={member?.avatar === undefined ?
                    member?.firstName![0] + "" + member?.lastName![0] : null
                }
                sx={{
                    width: 45,
                    height: 45,
                    border: "2px solid grey",
                    "@media screen and (max-width: 900px)": {
                        width: 35,
                        height: 35,
                    },
                }}
            />
            <Typography>{member?.firstName + " " + member?.lastName}</Typography>
        </Box>
    )
}
