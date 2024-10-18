import * as bcrypt from 'bcrypt';
export const hashPassword = (originalPass: string, callback: (err: Error | undefined, encrypted: string) => any) => {
    const saltRounds = 10;
    let result: string
    bcrypt.hash(originalPass, saltRounds, callback);

};
