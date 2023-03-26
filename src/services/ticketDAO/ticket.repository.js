import TicketDTO from "./ticketDTO.js";

export class ticketRepository {
  constructor(dao) {
    this.dao = dao;
  }

  async createTicket(cartID, email) {
    const ticket = await this.dao.createticket(cartID, email);
    const ticketDTO = new TicketDTO(ticket);
    return ticketDTO;
  }
}
