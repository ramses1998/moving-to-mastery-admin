import * as React from 'react';
import {useContext, useEffect, useState} from 'react';
import {ContributionOrder} from "../api/contribution-order";
import {AppContext} from "../context/AppContext";
import {Member} from "../api/members";
import {Avatar, Box, Chip, Typography} from "@mui/material";
import {DataTableComponent, StyledTableCell, StyledTableRow} from "./common/DataTableComponent";
import TableRow from "@mui/material/TableRow";
import {AddContributionOrderModalComponent} from "./common/AddContributionOrderModalComponent";
import {EditContributionOrderModalComponent} from "./common/EditContributionOrderModalComponent";

export function ContributionOrderPage() {

    const context = useContext(AppContext)
    const [contributionOrders, setContributionOrders] = useState<ContributionOrder[] | undefined>(undefined)
    const [members, setMembers] = useState<Member[] | undefined>(undefined)

    const header = [
        <StyledTableCell key={1}>Member</StyledTableCell>,
        <StyledTableCell key={2} sx={{
            "@media screen and (max-width: 900px)": {
                display: "none",
            },
        }}>Role</StyledTableCell>,
        <StyledTableCell key={3}>Ordre de beneficiare</StyledTableCell>,
        <StyledTableCell key={4}></StyledTableCell>,
    ]

    useEffect(() => {
        loadContributionOrders().then(data => setContributionOrders(data))
    }, [])

    useEffect(() => {
        loadMembers().then(data => setMembers(data))
    },[contributionOrders])

    const loadContributionOrders = async (): Promise<ContributionOrder[]> => {
        return await context.getAllContributionOrder()
    }

    const loadMembers = async (): Promise<Member[]> => {
        return await context.getAllMembers()
    }

    const getMemberOfOrder = (memberId: string): Member => {
        return members?.find(m => m.id === memberId)!
    }

    const handleOnDataChange = () => {
        loadContributionOrders().then(data => setContributionOrders(data))
    }

    const resolveRoleOfMember = (member: Member): string => {
        switch (member.role) {
            case "ACCOUNT-COMMISSIONER": return "Commissaire au compte"
            case "NORMAL-USER": return "Membre simple"
            case "PRESIDENT": return "President"
            case "SECRETARY": return "Secretaire"
            case "CENSOR": return "Censeur"
            case "TREASURY-OFFICER": return "Tresorrier"
            default: return "Membre simple"
        }
    }

    if (contributionOrders === undefined ||
        members === undefined) return <div>Loading...</div>

    return (
        <Box
            sx={{
                display: "grid",
                gap: 3,
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    gap: 3,
                    justifyContent: "space-between",
                }}
            >
                <Typography variant="h4">Ordre des membres</Typography>
                <AddContributionOrderModalComponent onClose={handleOnDataChange}/>
            </Box>
            <DataTableComponent headers={<TableRow>{header}</TableRow>}>
                {contributionOrders.map((contributionOrder, idx) => {
                    const member = getMemberOfOrder(contributionOrder.memberId)
                    return (
                        <StyledTableRow key={idx}>
                            <StyledTableCell scope="row">
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
                            </StyledTableCell>
                            <StyledTableCell
                                scope="row"
                                sx={{
                                    "@media screen and (max-width: 900px)": {
                                        display: "none",
                                    },
                                }}
                            >
                                <Chip
                                    label={resolveRoleOfMember(member)}
                                    color={"primary"}
                                    variant="outlined"
                                    size={"small"}
                                    sx={{justifySelf: "start", fontSize: 11}}
                                />
                            </StyledTableCell>
                            <StyledTableCell
                                sx={{
                                    textAlign: "left",
                                    // "@media screen and (max-width: 900px)": {
                                    //     textAlign: "right",
                                    // },
                                }}
                            >
                                {contributionOrder.order}
                            </StyledTableCell>
                            <StyledTableCell scope="row" align="left">
                                <EditContributionOrderModalComponent
                                    contributionOrder={contributionOrder}
                                    onClose={handleOnDataChange}
                                />
                            </StyledTableCell>
                        </StyledTableRow>
                    )
                })}
            </DataTableComponent>
        </Box>
    )
}
