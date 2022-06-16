
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export enum ActivityType {
    CREATED = "CREATED",
    LOGIN = "LOGIN"
}

export interface UserInput {
    username: string;
    password: string;
    affiliateCode?: Nullable<string>;
}

export interface LoginInput {
    username: string;
    password: string;
}

export interface AffiliateInput {
    name: string;
}

export interface ExchangeFilterInput {
    currencyCode: string;
    date?: Nullable<DateTime>;
}

export interface Affiliate {
    id: string;
    code: string;
    name: string;
}

export interface User {
    id: string;
    username: string;
    password: string;
    affiliate?: Nullable<Affiliate>;
    createdAt: DateTime;
    updatedAt: DateTime;
}

export interface Activity {
    id: string;
    type: ActivityType;
    user: User;
    createdAt: DateTime;
}

export interface IQuery {
    hello(): string | Promise<string>;
    me(): User | Promise<User>;
    activities(): Nullable<Nullable<Activity>[]> | Promise<Nullable<Nullable<Activity>[]>>;
    exchange(input?: Nullable<ExchangeFilterInput>): Nullable<JSON> | Promise<Nullable<JSON>>;
    affiliate(id?: Nullable<string>): Nullable<Affiliate> | Promise<Nullable<Affiliate>>;
    affiliates(): Nullable<Nullable<Affiliate>[]> | Promise<Nullable<Nullable<Affiliate>[]>>;
}

export interface IMutation {
    createAffiliate(input?: Nullable<AffiliateInput>): Affiliate | Promise<Affiliate>;
    createUser(input: UserInput): User | Promise<User>;
    login(input: LoginInput): string | Promise<string>;
}

export interface ISubscription {
    activityCreated(): Activity | Promise<Activity>;
}

export type DateTime = any;
export type JSON = any;
type Nullable<T> = T | null;
