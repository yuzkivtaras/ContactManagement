import { ContactList } from "./components/ContactList";
import { Counter } from "./components/Counter";
import { Home } from "./components/Home";

const AppRoutes = [
  {
    index: true,
    element: <Home />
  },
  {
    path: '/counter',
    element: <Counter />
  },
  {
    path: '/contact-list',
    element: <ContactList />
  }
];

export default AppRoutes;
