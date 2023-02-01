import { createContext } from "react";
import Posts from "../types";

type ContextType = [Posts, React.Dispatch<React.SetStateAction<Posts>>];
const Context = createContext<ContextType>({} as ContextType);

export default Context;
