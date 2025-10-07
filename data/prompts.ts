import type { Prompt } from '../types';

import { customerSuccessPrompts } from './prompts/customerSuccess';
import { engineerPrompts } from './prompts/engineer';
import { generalPrompts } from './prompts/general';
import { humanResourcesPrompts } from './prompts/humanResources';
import { managementPrompts } from './prompts/management';
import { marketingPrompts } from './prompts/marketing';
import { productManagerPrompts } from './prompts/productManager';
import { salesPrompts } from './prompts/sales';

export const PROMPTS: Prompt[] = [
    ...customerSuccessPrompts,
    ...engineerPrompts,
    ...generalPrompts,
    ...humanResourcesPrompts,
    ...managementPrompts,
    ...marketingPrompts,
    ...productManagerPrompts,
    ...salesPrompts,
];
