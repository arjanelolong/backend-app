import { Chance } from 'chance';
import { v4 as uuidv4 } from 'uuid';
import generateAffiliateCode from '../../src/library/generateAffiliateCode';

const chance = new Chance();

export default function () {
  return {
    id: uuidv4(),
    code : generateAffiliateCode(),
    name: chance.name(),
  };
}
