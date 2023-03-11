import {GroupedTransaction} from "../helpers/transactions";
import {ContributionAmount} from "../api/contribution-amount";
import {Fine} from "../api/fines";
import React, {useContext, useEffect, useState} from "react";
import {AppContext} from "../context/AppContext";
import {Member} from "../api/members";
import {MAIN_ACCOUNT} from "../api/transactions";
import {Avatar, Box, Chip, IconButton, TableRow, Typography} from "@mui/material";
import {convertNumericMonthHumanReadableFormat} from "../helpers/dateHelpers";
import {DataTableComponent, StyledTableCell, StyledTableRow} from "./common/DataTableComponent";
import {DEFAULT_CURRENCY} from "../api/main-bank-account";
import RemoveIcon from '@mui/icons-material/Remove';
import {AddFineModalComponent} from "./common/AddFineModalComponent";

type Props = {
    groupedTransaction: GroupedTransaction
    contributionAmount: ContributionAmount
    fines: Fine[]
    onDataChange: () => void
}
export const ContributionItem: React.FC<Props> = (props: Props) => {

    const context = useContext(AppContext)
    const [members, setMembers] = useState<Member[] | undefined>(undefined)

    const headers = [
        <StyledTableCell key={1}>Membre</StyledTableCell>,
        <StyledTableCell key={2} sx={{
            "@media screen and (max-width: 900px)": {
                display: "none",
            },
        }}>Montant à cotiser</StyledTableCell>,
        <StyledTableCell key={3}>Ammende</StyledTableCell>,
        <StyledTableCell key={4}>Déjà payé</StyledTableCell>,
        <StyledTableCell key={5}>Status</StyledTableCell>,
        <StyledTableCell key={6}></StyledTableCell>,
    ]

    useEffect(() => {
        loadMembers().then(data => setMembers(data))
    }, [])

    const loadMembers = async (): Promise<Member[]> => {
        return Promise.all(props.groupedTransaction.transactions.map(t => {
            if (t.senderId !== MAIN_ACCOUNT) {
                return context.getMemberById(t.senderId)
            }
            return context.getMemberById(t.receiverId)
        })!).then(response => response.flatMap(r => r))
    }

    const getMemberOfTransaction = (sender: string, receiver: string): Member => {
        if (sender !== MAIN_ACCOUNT) return members?.find(m => m.id === sender)!
        return members?.find(m => m.id === receiver)!
    }

    const getFineOfMemberForGivenMonthAndYear = (memberId: string, fineDate: Date): Fine => {
        return props.fines.find(fine =>
            fine.memberId === memberId &&
            fine.creationDate.getMonth() === fineDate.getMonth() &&
            fine.creationDate.getFullYear() === fineDate.getFullYear()
        )!
    }

    const getAmountContributedByMemberInGivenMonthAndYear = (memberId: string, fineDate: Date): number => {
        return props.groupedTransaction.transactions
            .filter(t =>
                t.senderId === memberId &&
                t.creationDate.getMonth() === fineDate.getMonth() &&
                t.creationDate.getFullYear() === fineDate.getFullYear()
            )
            .map(t => t.amount)
            .reduce((acc: number, currentValue: number) => acc + currentValue, 0)
    }

    const handleDelete = async (id: string) => {
        await context.deleteFine(id)
        props.onDataChange()
    }

    if (members === undefined) return <div>Loading here...</div>

    return (
        <Box
            sx={{
                display: "grid",
                gap: 1
            }}
        >
            <Typography variant="h6">
                {convertNumericMonthHumanReadableFormat(props.groupedTransaction.groupTitle.month) +
                    " " + props.groupedTransaction.groupTitle.year
                }
            </Typography>
            <Box>
                <DataTableComponent headers={<TableRow>{headers}</TableRow>}>
                    {props.groupedTransaction.transactions.map((transaction, idx) => {
                        const member = getMemberOfTransaction(transaction.senderId, transaction.receiverId)
                        const fine = getFineOfMemberForGivenMonthAndYear(member?.id, transaction.creationDate)
                        const amountContributed = getAmountContributedByMemberInGivenMonthAndYear(member?.id, transaction.creationDate)
                        const hasMonthlyContributionBeenPaid = amountContributed - props.contributionAmount.amount - (fine?.amount ?? 0) >= 0
                        return (
                            <StyledTableRow key={idx}>
                                <StyledTableCell scope="row" align="left">
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
                                    align="left"
                                    sx={{
                                        "@media screen and (max-width: 900px)": {
                                            display: "none",
                                        },
                                    }}
                                >
                                    {props.contributionAmount.amount + " " + (props.contributionAmount?.currency ?? DEFAULT_CURRENCY)}
                                </StyledTableCell>
                                <StyledTableCell scope="row" align="left">{(fine?.amount ?? 0) + " " + (fine?.currency ?? DEFAULT_CURRENCY)}</StyledTableCell>
                                <StyledTableCell scope="row" align="left">{transaction.amount + " " + (transaction?.currency ?? DEFAULT_CURRENCY)}</StyledTableCell>
                                <StyledTableCell scope="row" align="left">
                                    <Chip
                                        label={hasMonthlyContributionBeenPaid ? "à jour" : "pas à jour"}
                                        color={hasMonthlyContributionBeenPaid ? "success" : "error"}
                                        sx={{justifySelf: "start"}}
                                    />
                                </StyledTableCell>
                                <StyledTableCell scope="row" align="left">
                                    {
                                        props.groupedTransaction.groupTitle.month === new Date().getMonth() &&
                                        props.groupedTransaction.groupTitle.year === new Date().getFullYear() ?
                                            <Box
                                                sx={{
                                                    display: "flex",
                                                    gap: 2,
                                                }}
                                            >
                                                {fine?.amount === undefined || fine?.amount === 0 ?
                                                    <AddFineModalComponent member={member} onClose={props.onDataChange}/>
                                                    :
                                                    <IconButton sx={{border: "2px solid gray"}} onClick={() => handleDelete(fine.id)}>
                                                        <RemoveIcon fontSize="small"/>
                                                    </IconButton>
                                                }
                                            </Box> : null
                                    }
                                </StyledTableCell>
                            </StyledTableRow>
                        )}
                    )}
                </DataTableComponent>
            </Box>
        </Box>
    )
}
