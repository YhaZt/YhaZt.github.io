import { createContext, useContext } from 'react';

const ChatContext = createContext({
  openChat: () => {},
});

export function ChatProvider({ children, openChat }) {
  return (
    <ChatContext.Provider value={{ openChat }}>
      {children}
    </ChatContext.Provider>
  );
}

export function useChat() {
  return useContext(ChatContext);
}
