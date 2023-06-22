import {
  ChakraProvider,
  useMediaQuery,
  Grid,
} from "@chakra-ui/react"
import { useContext, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import Sidebar from "./components/Sidebar";
import { MobileSideBar } from "./components/Sidebar/index.mobile";
import Router from "./routes"
import { ThemeContext } from "./context/ThemeContext";
import Topbar from "./components/Topbar";
import { HandleImageProvider } from "./context/HandleImageContext"

function App() {
  const [cookies] = useCookies(["loginToken"]);
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    if (cookies.loginToken) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    };
  }, [cookies]);

  const [isLargerThan768] = useMediaQuery('(min-width: 768px)');

  return (
    <HandleImageProvider>
      <ChakraProvider theme={theme}>
        {loggedIn && (
          <Topbar />
        )}
        <Grid h="100%" gridTemplateColumns={loggedIn ? ["100%", "100%", "15% 85%"] : "100%"} w="100%">
          {loggedIn && (
            <>
              {isLargerThan768 && (<Sidebar />)}
              {!isLargerThan768 && (<MobileSideBar />)}
            </>
          )}
          <Router />
        </Grid>
      </ChakraProvider>
    </HandleImageProvider>
    
  );
}

export default App;
