import { Ticket } from "../tickets";

it('implementions optimistic concurrency control', async () => {
  //create ticket istance
  const ticket = Ticket.build({
    title: 'concert',
    price: 5,
    userId: '123'
  });
  

  //save ticket to DB
  await ticket.save();
  // fetch ticket twice, 
  const firstInstance = await Ticket.findById(ticket.id);
  const secondInstance = await Ticket.findById(ticket.id);
  //make two seperate changes to the tickets we fetched.
  firstInstance!.set({ price: 10 });
  secondInstance!.set({ price: 15});
  //save the first fetched ticket,
  await firstInstance!.save();
  try {
    await secondInstance!.save();
  } catch (err) {
    return;
  }

  throw new Error('Should not reach this point');
});

it('increments the version number of multiple saves', async () => {
  const ticket = Ticket.build({
    title: 'concert',
    price: 5,
    userId: '123'
  });
  
  await ticket.save();
  expect(ticket.version).toEqual(0);
  await ticket.save();
  expect(ticket.version).toEqual(1);
  await ticket.save();
  expect(ticket.version).toEqual(2);
});