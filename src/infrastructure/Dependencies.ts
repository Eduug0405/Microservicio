import { ItemRepositoryMySQL } from './repositories/ItemRepositoryMySQL';
import { UserRepositoryMySQL } from './repositories/UserRepositoryMySQL';
import { TransactionRepositoryMySQL } from './repositories/TransactionRepositoryMySQL';
import { CreateUser } from '../application/CreateUser';
import { ListItems } from '../application/ListItems';
import { BuyItem } from '../application/BuyItem';
import { CreateItem } from '../application/CreateItem';
import { GetBalance } from '../application/GetBalance';
import { ListBalances } from '../application/ListBalances'; 

// Repositorios
const itemRepo = new ItemRepositoryMySQL();
const userRepo = new UserRepositoryMySQL();
const transactionRepo = new TransactionRepositoryMySQL();
const createUser = new CreateUser(userRepo);
const createItem = new CreateItem(itemRepo);
const getBalance = new GetBalance(userRepo);
const listBalances = new ListBalances(userRepo);         

// Casos de uso
const listItems = new ListItems(itemRepo);
const buyItem = new BuyItem(userRepo, itemRepo, transactionRepo);

export const dependencies = {
  itemRepo,
  userRepo,
  transactionRepo,
  createUser,
  listItems,
  buyItem,
  createItem,
  getBalance,
  listBalances              
};
