'use server'
import { getSignInUrl, withAuth} from "@workos-inc/authkit-nextjs";
import { WorkOS } from "@workos-inc/node";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

export default async function NewListingPage() {
    const { user } = await withAuth();
    const signInUrl = await getSignInUrl();
    const workos = new WorkOS(process.env.WORK_API_KEY);




    if (!user) {
        return (
            <div className="container">
                <Link className="flex item-center container bg-blue-800" href={signInUrl}>Login</Link>
            </div>
        )
    }

    const organizationMemberships = await workos.userManagement.listOrganizationMemberships({
        userId: user.id,
    })

    const activeOrganizationMemberships = organizationMemberships.data.filter(om => om.status === 'active');
    const organizationsNames: { [key: string]: string } = {};
    for (const activeMembership of activeOrganizationMemberships) {
        const organization = await workos.organizations.getOrganization(activeMembership.organizationId);
        organizationsNames[organization.id] = organization.name;
    }


    return (
        <div className="container">
            <div>
                <h1 className="text-lg mt-5">Your companies</h1>
                <p className="text-gray-500 text-sm mb-2">Select a company to create a job add for</p>
                <div>
                    <div className="border inline-block rounded-md">
                        {Object.keys(organizationsNames).map(orgId => (
                            <Link
                                href={'/new-listing/' + orgId}
                                className={"py-2 px-4 flex items-center gap-2 "
                                    + (Object.keys(organizationsNames)[0] === orgId ? '' : 'border-t')}>
                                {organizationsNames[orgId]}
                                <FontAwesomeIcon className="h-4" icon={faArrowRight} />
                            </Link>
                        ))}
                    </div>
                </div>

                {organizationMemberships.data.length === 0 && (
                    <div className="border border-blue-200 bg-blue-50 p-4 rounded-md">
                        No companies found assigned to your user
                    </div>
                )}

                <Link className="inline-flex gap-2 items-center bg-gray-200 rounded-md px-4 py-2 mt-6"
                    href={'/new-company'}>
                    Create a new company
                    <FontAwesomeIcon className="h-4" icon={faArrowRight} />
                </Link>
            </div>
        </div>
    )
}