import { RouteRecordRaw } from 'vue-router'
import { LoginUserInfo } from './api'
import { LocaleType } from './config'


export declare interface UserStoreState {
    accessToken: string | null;
    roles: string[];
    userInfo: LoginUserInfo | null;
}

export declare interface ElConfigProvider {
    size: string,
    namespace: string,
    button: object,
    message: object
}

export declare interface ConfigStoreState {
    elConfigProvider: ElConfigProvider,
    collapse: boolean;
    iconSize: number;
    dark: boolean;
    mainHeight: number;
    menus: RouteRecordRaw[];
}

export declare interface LocaleStoreState {
    locale: LocaleType
}