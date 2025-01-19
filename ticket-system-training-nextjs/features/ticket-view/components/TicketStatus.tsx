interface TicketStatusProps {
  usedTime: string | null;
  status: string | null;
}

const TicketStatus = ({ usedTime, status }: TicketStatusProps) => {
  const isEntered = !!usedTime;
  const isSending = status === 'sending';
  const isCompleted = status === 'completed';

  return (
    <div className="flex gap-3">
      {!isEntered && (
        <div>
          <span className="bg-[#1eb98c] py-1 px-2 text-sm text-white rounded-sm font-semibold">
            利用可能
          </span>
        </div>
      )}
      {isEntered && (
        <div>
          <span className="bg-red-500 py-1 px-2 text-sm text-white rounded-sm font-semibold">
            入場済み
          </span>
        </div>
      )}
      {isSending && (
        <div>
          <span className="bg-yellow-500 py-1 px-2 text-sm text-white rounded-sm font-semibold">
            譲渡中のチケット
          </span>
        </div>
      )}
      {isCompleted && (
        <div>
          <span className="bg-yellow-500 py-1 px-2 text-sm text-white rounded-sm font-semibold">
            譲渡されたチケット
          </span>
        </div>
      )}
    </div>
  );
};

export default TicketStatus;
