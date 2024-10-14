import { JobModel } from "@/models/Job";
import { WorkOS } from "@workos-inc/node";
import mongoose from "mongoose";
import {withAuth} from "@workos-inc/authkit-nextjs";
import JobForm from "@/app/components/JobForm";

type PageProps = {
    params: {
        jobId:string;
    }
};

export default async function EditJobPage(pageProps:PageProps) {
    const jobId = pageProps.params.jobId;
    await mongoose.connect(process.env.MONGO_URI as string);
    const jobDoc =JSON.parse(JSON.stringify( await JobModel.findById(jobId)));
    if(!jobDoc) {
        return 'not found';
    }
    const {user} = await withAuth();
    const workos = new WorkOS(process.env.WORKOS_API_KEY);
    if (!user) {
        return 'you need to login';
    }
    const oms = await workos.userManagement.listOrganizationMemberships({
        userId: user.id,
        organizationId:jobDoc.orgId,
    });
    if(oms.data.length ===0) {
        return 'Access denied';
    }
    return (
        <div>
            <JobForm orgId={jobDoc.orgId} jobDoc={jobDoc} />
        </div>
    );
}