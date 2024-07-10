import { Ref, JSX } from 'react';
export type MountAnimationType<T> = {
    children: (animation: MountChildrenType<T>) => JSX.Element | false | null;
    mount: boolean;
    duration?: number;
    params: {
        init?: T;
        open: T;
        close: T;
    };
};
export type MountStateType = 'init' | 'open' | 'close';
type MountChildrenType<T> = {
    state: MountStateType;
    ref: Ref<any>;
} & T;
declare const MountAnimation: <T>({ children, mount, params, duration }: MountAnimationType<T>) => JSX.Element | null;
export default MountAnimation;
