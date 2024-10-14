import { withAuth } from "@workos-inc/authkit-nextjs";
import { WorkOS } from "@workos-inc/node";
import JobForm from "@/app/components/JobForm";

type PageProps = {
    params: {
        orgId: string;
    }
}

export default async function NewListingForOrgPage(props: PageProps) {

    


    const { user } = await withAuth();
    const workos = new WorkOS(process.env.WORKOS_API_KEY);
    if (!user) {
        return 'Please log in';
    }
    const orgId = props.params.orgId;
    const oms = await workos.userManagement.listOrganizationMemberships({ userId: user.id, organizationId: orgId });
    // const om = oms.data.find(om =>om.organizationId===orgId);
    const hasAccess = oms.data.length > 0;
    // return JSON.stringify(hasAccess);
    if (!hasAccess) {
        return 'no access'
    }

    return (
        <JobForm orgId={orgId} />
    );
}