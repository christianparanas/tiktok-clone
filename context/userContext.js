import db, { auth } from "lib/firebase";
import { createContext, useState, useEffect, useContext } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

const UserContext = createContext();
