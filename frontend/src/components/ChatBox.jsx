const ChatBox = ({ messages, isLoading }) => {
  return (
    <div className="flex flex-col gap-4 bg-white/80 border border-white/60 rounded-2xl p-6 shadow-soft min-h-[360px]">
      {messages.length === 0 && (
        <p className="text-[var(--muted)]">Start a conversation to see AI responses here.</p>
      )}
      {messages.map((msg, idx) => (
        <div
          key={msg.role + '-' + idx}
          className={
            'max-w-[85%] px-4 py-3 rounded-2xl animate-fadeUp ' +
            (msg.role === 'user'
              ? 'ml-auto bg-[var(--accent)] text-white'
              : 'bg-[var(--panel-2)] text-[var(--ink)]')
          }
        >
          <p className="text-sm leading-relaxed">{msg.content}</p>
          <span className="text-[10px] opacity-70">{msg.timestamp}</span>
        </div>
      ))}
      {isLoading && (
        <div className="bg-[var(--panel-2)] text-[var(--ink)] px-4 py-3 rounded-2xl w-fit">
          <p className="text-sm">Thinking...</p>
        </div>
      )}
    </div>
  );
};

export default ChatBox;
