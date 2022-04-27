import { createContext, useState, useContext } from "react";

const DiscardModalContext = createContext()

export function DiscardModalProvider({ children }) {
  const [isDiscardOpen, setDiscardOpen] = useState(false)

  const openDiscardModal = () => setDiscardOpen(true)
  const closeDiscardModal = () => setDiscardOpen(false)

  return (
    <DiscardModalContext.Provider value={{ isDiscardOpen, openDiscardModal, closeDiscardModal }}>
      {children}
    </DiscardModalContext.Provider>
  )
}

export default function useDiscardModal() {
  const context = useContext(DiscardModalContext)

  if(context == undefined) {
    throw new Error("There's something wrong in the Discard Context.")
  }

  return context
}