export const createTicketViewItemUrl = (
  tabValue: string,
  ticketViewId: string,
) => {
  let ticketItemLink = '';

  switch (tabValue) {
    case 'sending':
      ticketItemLink = `/ticket_view/${ticketViewId}/transfer`;
      break;
    case 'receive':
      ticketItemLink = `/ticket_view/${ticketViewId}/receive`;
      break;
    default:
      ticketItemLink = `/ticket_view/${ticketViewId}`;
      break;
  }

  return ticketItemLink;
};
