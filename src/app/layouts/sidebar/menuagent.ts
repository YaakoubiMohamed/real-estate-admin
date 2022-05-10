import { MenuItem } from './menu.model';

export const MENUAGENT: MenuItem[] = [
    {
        id: 1,
        label: 'MENUITEMS.MENU.TEXT',
        isTitle: true
    },
    {
        id: 2,
        label: 'MENUITEMS.DASHBOARDS.TEXT',
        icon: 'bx-home-circle',
        link: '/dashboard',
    },
    {
        id: 7,
        isLayout: true
    },
    {
        id: 9,
        label: 'MENUITEMS.RESERVATION.TEXT',
        icon: 'bx-calendar',
        link: '/reservation',
    },
    {
        id: 9,
        label: 'MENUITEMS.IMMOBILIERS.TEXT',
        icon: 'bx-calendar',
        link: '/annonces',
    },
    {
        id: 9,
        label: 'MENUITEMS.CLIENTS.TEXT',
        icon: 'bx-calendar',
        link: '/clientsagent',
    },
    {
        id: 10,
        label: 'MENUITEMS.CHAT.TEXT',
        icon: 'bx-chat',
        link: '/chat',
        
    },
];

