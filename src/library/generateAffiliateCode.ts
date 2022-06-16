import { customAlphabet } from 'nanoid';

const nanoid = customAlphabet('1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ', 10);

export default () =>  nanoid();
