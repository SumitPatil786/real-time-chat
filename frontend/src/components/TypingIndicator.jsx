export default function TypingIndicator ({user}){
    return user ? <p className="typing">{user} is typing...</p> : null; 
}