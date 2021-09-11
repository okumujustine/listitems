

import { container } from 'tsyringe';
import '@modules/users/providers/';
import ItemRepository from '@modules/items/infra/database/repositories/ItemRepositories';
import IItemRepository from '@modules/items/repositories/IItemRepository';


container.registerSingleton<IItemRepository>(
    'ItemRepository',
    ItemRepository,
);