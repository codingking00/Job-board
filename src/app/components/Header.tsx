import Link from "next/link";
import { getSignInUrl, withAuth, signOut} from "@workos-inc/authkit-nextjs";

export default async function Header() {
    const {user} = await withAuth();
    const signInUrl = await getSignInUrl();
    return (
        <header >
            <div className="container flex items-center justify-between py-4 px-6 mx-auto">
            <Link href={'/'} className="font-bold text-xl">Job Board</Link>
            <nav className="flex gap-4">
                {!user &&(<Link className="bg-gray-200 py-2 px-4 rounded-md" href={signInUrl}>Login</Link>)}
                {user && (
                    <form action={async () => {
                        'use server';
                        await signOut();
                      }}>
                        <button type="submit" className="bg-gray-200 py-2 px-4 rounded-md">Logout</button>
                    </form>
                    )}
                <Link href={'/new-listing'} className="bg-blue-600 py-2 px-4 rounded-md text-white">Post a job</Link>
            </nav>
            </div>
        </header>

    );
}