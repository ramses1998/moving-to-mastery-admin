import React, {useContext, useState} from "react";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Typography from "@mui/material/Typography";
import {AppBarProps as MuiAppBarProps} from "@mui/material/AppBar/AppBar";
import {styled} from "@mui/material/styles";
import MuiAppBar from "@mui/material/AppBar";
import {drawerWidth} from "./SideBarDrawerContainer";
import {Route, Routes} from "react-router-dom";
import {Avatar, Box} from "@mui/material";
import {UserContext} from "../../context/userContext";
import LogoutIcon from '@mui/icons-material/Logout';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import {AppContext} from "../../context/AppContext";
import {AlertDialogSlideComponent} from "../common/AlertDialogSlideComponent";

type Props = {
    open: boolean
    setOpen: (value: boolean) => void
}
export const AppBarComponent: React.FC<Props> = (props: Props) => {

    const userContext = useContext(UserContext)
    const context = useContext(AppContext)
    const [loaded, setLoaded] = useState<boolean>(false)

    const handleExtractFiles = async () => {
        await context.extractFiles()
        setLoaded(true)
    }

    return (
        <AppBar
            position="fixed"
            open={props.open}
        >
            <Toolbar
                sx={{
                    display: "grid",
                    gridTemplateColumns: "repeat(2, max-content) 1fr",
                    ...(props.open && {
                        gridTemplateColumns: "1fr 1fr",
                    }),
                    "@media screen and (max-width: 900px)": {
                        gridTemplateColumns: "max-content 1fr",
                    },
                }}
            >
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    onClick={() => props.setOpen(true)}
                    edge="start"
                    sx={{
                        marginRight: 5,
                        ...(props.open && { display: 'none' }),
                        "@media screen and (max-width: 900px)": {
                            display: "none",
                        },
                    }}
                >
                    <MenuIcon />
                </IconButton>
                <Typography
                    variant="h6"
                    noWrap
                    component="div"
                    sx={{
                        "@media screen and (max-width: 900px)": {
                            display: "none",
                            pl: 2,
                        },
                    }}
                >
                    <Routes>
                        <Route path={"/"} element={<div>Acceuil</div>}/>
                        <Route path={"/home"} element={<div>Acceuil</div>}/>
                        <Route path={"/members"} element={<div>Membres</div>}/>
                        <Route path={"/contribution-order"} element={<div>Ordre de beneficiaire</div>}/>
                        <Route path={"/monthly-contribution"} element={<div>Cotisations</div>}/>
                        <Route path={"/fund-repository"} element={<div>Compte</div>}/>
                        <Route path={"/annual-transactions"} element={<div>Transactions du compte Paypal</div>}/>
                        <Route path={"/detailed-transactions"} element={<div>Transactions du compte Paypal</div>}/>
                    </Routes>
                </Typography>
                <Typography sx={{
                    fontWeight: "bold",
                    "@media screen and (min-width: 900px)": {
                        display: "none",
                    },
                }}>
                    Moving to mastery
                </Typography>
                <Box
                    sx={{
                        display: "flex",
                        gap: 3,
                        alignItems: "center",
                        justifySelf: "end",
                        mr: 1,
                        "@media screen and (max-width: 900px)": {
                            mr: 0.1,
                        },
                    }}
                >
                    <Box sx={{textAlign: "right"}}>
                        <Typography>{userContext.user?.firstName + " " + userContext.user?.lastName}</Typography>
                        <Typography sx={{fontSize: 13, mt: -0.5}}>{userContext.user?.paypal}</Typography>
                    </Box>
                    <Avatar
                        src={userContext.user?.avatar}
                        alt={userContext.user?.firstName + " " + userContext.user?.lastName}
                        children={userContext.user?.avatar === undefined ?
                            userContext.user?.firstName![0] + "" + userContext.user?.lastName![0] : null
                        }
                        sx={{
                            width: 45,
                            height: 45,
                            border: "2px solid white",
                        }}
                    />
                    <Box
                        sx={{
                            display: "flex",
                            gap: 0.5,
                        }}
                    >
                        <IconButton
                            onClick={userContext.logout}
                            sx={{
                                "@media screen and (max-width: 900px)": {
                                    display: "none",
                                },
                            }}
                        >
                            <LogoutIcon sx={{color: "white"}}/>
                        </IconButton>
                        <IconButton
                            onClick={handleExtractFiles}
                            sx={{
                                "@media screen and (max-width: 900px)": {
                                    display: "none",
                                },
                            }}
                        >
                            <SaveAltIcon sx={{color: "white"}}/>
                        </IconButton>
                    </Box>
                </Box>
            </Toolbar>
            <AlertDialogSlideComponent
                title={"Exportation des données terminée"}
                content={"Les données extraites ont été sauvegardées dans <code>./data</code> à l'intérieur du répertoire racine du serveur."}
                open={loaded}
                setOpen={setLoaded}
            />
        </AppBar>
    )
}

interface AppBarProps extends MuiAppBarProps {
    open?: boolean;
}
const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
    backgroundColor: "var(--primary-color)",
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}))

