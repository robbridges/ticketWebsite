import request from 'supertest';
import { app } from '../../app';

it('responds with details about current user', async() => {
  
  const cookie = await global.signin();

  const response = await request(app)
    .get('/api/users/currentuser')
    .set('Cookie', cookie)
    .send()
    .expect(200);
  expect(response.body.currentUser.email).toEqual('admin@admin.com');
});

it('If not signed in currentuser is null', async () => {
  const response = await request(app)
    .get('/api/users/currentuser')
    .send()
    .expect(200);
    
    expect(response.body.currentUser).toEqual(null);
});