import TicketDTO from "./ticketDTO.js";

export class ticketRepository {
  constructor(dao) {
    this.dao = dao;
  }

  async createTicket(idCart, email) {
    const ticket = await this.dao.createticket(idCart, email);
    const ticketDTO = new TicketDTO(ticket);
    return ticketDTO;
  }
}
