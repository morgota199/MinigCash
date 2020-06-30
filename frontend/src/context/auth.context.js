import { createContext } from 'react';

const noop = () => {};

export const AuthContext = createContext({
    token:    null,
    userId:   null,
    userName: null,
    badge:    null,
    setBadge: noop(),
    login:    noop(),
    logout:   noop(),
    isAuth:   false,
    admin:    false,
    balance:       {},
    offBalance:    noop(),
    setBalance:    noop(),
});

export const RefContext = createContext({
    ref:       null,
    logoutRef: noop(),
    loginRef:  noop(),
});

export const BalanceContext = createContext({
    balance:       {},
    offBalance:    noop(),
    setBalance:    noop(),
});

export const MiningContext = createContext({
    mining:        null,
    setMining:     noop(),
    initialMining: noop(),
    removeMining:  noop()
});

export const TicetContext = createContext({
    ticet: [],
    setTicet: noop()
});

export const TablePayContext = createContext({
    allPay: [],
    setAllPay: noop()
});

export const PagePayContext = createContext({
    pagePay: [],
    setPagePay: noop()
});

export const UsersContext = createContext({
    users: [],
    setUsers: noop()
});

export const AllNewsContext = createContext({
    pages: null,
    allNews: [],
    redactNews: {},
    setPages: noop(),
    setAllNews: noop(),
    setRedactNews: noop()
});

export const RefUserPayContext = createContext({
    payUser: {},
    referral: {},
    setReferral: noop()
})