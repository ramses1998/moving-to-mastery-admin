import React, {useContext, useEffect, useState} from "react";
import {AppContext} from "../context/AppContext";
import {useNavigate} from "react-router-dom";
import {MAIN_ACCOUNT, Transaction, TransactionType} from "../api/transactions";
import {Box, ButtonGroup, IconButton, TableRow} from "@mui/material";
import {PageHeaderComponent} from "./common/PageHeaderComponent";
import {DataTableComponent, StyledTableCell, StyledTableRow} from "./common/DataTableComponent";
import {DEFAULT_CURRENCY} from "../api/main-bank-account";
import {formatJavaScriptDateToStringDateTime} from "../helpers/dateHelpers";
import {Member} from "../api/members";
import {ReceiveMoneyModalComponent} from "./common/ReceiveMoneyModalComponent";
import {SendMoneyModalComponent} from "./common/SendMoneyModalComponent";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import {MemberWithAvatar} from "./common/MemberWithAvatar";

export const DetailedTransactionListPage: React.FC = () => {

    const context = useContext(AppContext)
    const navigate = useNavigate()
    const [transactions, setTransactions] = useState<Transaction[] | undefined>(undefined)
    const [members, setMembers] = useState<Member[] | undefined>(undefined)

    const headers = [
        <StyledTableCell key={1}>Émetteur</StyledTableCell>,
        <StyledTableCell key={2}>Destinataire</StyledTableCell>,
        <StyledTableCell key={4}>Type</StyledTableCell>,
        <StyledTableCell key={5}>Date / Heure</StyledTableCell>,
        <StyledTableCell key={6}>Montant</StyledTableCell>,
        <StyledTableCell key={7}></StyledTableCell>,
    ]

    useEffect(() => {
        loadData()
    }, [])

    const loadData = () => {
        context.getTransactions().then(data => setTransactions(data))
        context.getAllMembers().then(data => setMembers(data))
    }

    const resolveTransactionType = (type: TransactionType, senderId: string): string => {
        switch (true) {
            case type === "fund" && senderId !== MAIN_ACCOUNT: return "Fond de caisse"
            case type === "contribution" && senderId !== MAIN_ACCOUNT: return "Versement de Cotisation a un membre"
            case type === "contribution" && senderId === MAIN_ACCOUNT: return "Paiement de Cotisation par un membre"
            case type === "expense": return "Dépense extra"
            default: return "Dépense extra"
        }
    }

    const resolveMemberOfTransaction = (memberId: string): Member => {
        return members?.find(m => m.id === memberId)!
    }

    const handleOnDataChange = () => {
        loadData()
    }

    const handleOnDelete = async (id: string) => {
        await context.deleteTransaction(id)
        handleOnDataChange()
    }

    if (transactions === undefined ||
        members === undefined) return <div>Loading...</div>

    return (
        <Box
            sx={{
                display: "grid",
                gap: 3,
            }}
        >
            <PageHeaderComponent
                title={"Transactions détaillés"}
                onClick={() => navigate(-1)}
            />
            <Box
                sx={{
                    justifySelf: "end"
                }}
            >
                <ButtonGroup>
                    <ReceiveMoneyModalComponent onClose={handleOnDataChange}/>
                    <SendMoneyModalComponent onClose={handleOnDataChange}/>
                </ButtonGroup>
            </Box>
            <DataTableComponent headers={<TableRow>{headers}</TableRow>}>
                {transactions
                    .sort((a, b) => b.creationDate.getTime() - a.creationDate.getTime())
                    .map((transaction, idx) =>
                        <StyledTableRow key={idx}>
                            <StyledTableCell scope="row">
                                {transaction.senderId === MAIN_ACCOUNT ?
                                    "compte principale" :
                                    <MemberWithAvatar member={resolveMemberOfTransaction(transaction.senderId)}/>
                                }
                            </StyledTableCell>
                            <StyledTableCell scope="row">
                                {transaction.receiverId === MAIN_ACCOUNT ?
                                    "compte principale" :
                                    <MemberWithAvatar member={resolveMemberOfTransaction(transaction.receiverId)}/>
                                }
                            </StyledTableCell>
                            <StyledTableCell scope="row">{resolveTransactionType(transaction.type, transaction.senderId)}</StyledTableCell>
                            <StyledTableCell scope="row" sx={{color: "gray"}}>{formatJavaScriptDateToStringDateTime(transaction.creationDate)}</StyledTableCell>
                            <StyledTableCell
                                scope="row"
                                sx={{
                                    color: transaction.receiverId === MAIN_ACCOUNT ? "green" : "red",
                                }}
                            >
                                {transaction.amount} {transaction.currency ?? DEFAULT_CURRENCY}
                            </StyledTableCell>
                            <StyledTableCell scope="row">
                                <IconButton sx={{border: "2px solid gray"}} onClick={() => handleOnDelete(transaction.id)}>
                                    <DeleteOutlinedIcon fontSize="small" sx={{color: "red"}}/>
                                </IconButton>
                            </StyledTableCell>
                        </StyledTableRow>
                    )}
            </DataTableComponent>
        </Box>
    )
}
