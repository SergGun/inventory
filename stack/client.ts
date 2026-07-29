import { StackClientApp } from '@stackframe/stack';

export const stackClientApp = new StackClientApp({
  tokenStore: 'nextjs-cookie',
  urls: {
    default: {
      type: 'hosted',
    },
    home: '/',
    signIn: '/sign-in',

    afterSignIn: '/dashboard',
    afterSignUp: '/dashboard',
    afterSignOut: '/',
  },
});
