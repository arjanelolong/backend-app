import { Chance } from 'chance';
import { v4 as uuidv4 } from 'uuid';
import { customAlphabet } from 'nanoid'

const chance = new Chance();
const nanoid = customAlphabet('1234567890abcdefhijklmnopqrstuvwxyz', 10);

export default function () {
  return {
    id: uuidv4(),
    username: nanoid(),
    password: chance.word(),
    createdAt: new Date(),
    updatedAt: new Date(),
  };
}
