import { authkitMiddleware } from '@workos-inc/authkit-nextjs';

export default authkitMiddleware({
    redirectUri: process.env.WORKOS_REDIRECT_URI || 'http://localhost:3000/api/auth/callback',
});

// Match against pages that require authentication
// Leave this out if you want authentication on every page in your application
export const config = { 
    matcher: [
    '/', 
    '/new-listing',
    '/new-listing/:orgId*',
    '/new-company',
    '/jobs/:orgId*',
    '/jobs/edit/:jobId*',
    '/show/:jobId*',
] 
};