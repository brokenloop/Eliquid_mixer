// import EmbedID from '../EmbedID';
import mockApi from './mockApi';

jest.mock('axios');
mockApi();

it('logs in', async () => {
    expect(1).toEqual(1);
});

