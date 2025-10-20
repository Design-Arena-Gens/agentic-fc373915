import React from 'react';

export const ClerkProvider = ({ children }) => children;
export const UserButton = () => <div />;
export const SignIn = () => <div />;
export const SignUp = () => <div />;
export const auth = () => ({ userId: "test-user-id" });
export const clerkMiddleware = (auth, req) => {};
export const createRouteMatcher = () => () => true;