import { userService } from '../services/user-service.js';

let username = 'tester';
let password = 'tester';

it('Creates user', async () => {
    console.log('test start');
    return userService.createUser(username, password)
        .then(res => {
            console.log(res);
            expect(res).toBeDefined();
        })
        .catch(error => {
            console.log(error);
            done.fail(new Error('This is the error'))
        })
});

// it('Logs in', async () => {
    
//     return userService.login(username, password)
//     .then(res => {
//         console.log(res);
//         expect(res).toBeDefined();
//     });
// });