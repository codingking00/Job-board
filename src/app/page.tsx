import Jobs from "./components/Jobs";
import { addOrgAndUserData, JobModel } from "@/models/Job";
import { withAuth } from "@workos-inc/authkit-nextjs";
import mongoose from "mongoose";
import Hero from "./components/Hero";


export default async function Home() {
  const {user} = await withAuth();
  await mongoose.connect(process.env.MONGO_URI as string);
  const latestJobs = await addOrgAndUserData(await JobModel.find({},{},{limit:5,sort:'-createdAt'}),
  user,
);
  
  return (
    <>
      <Hero />
      <Jobs header={''} jobs={latestJobs}/>
    </>
  );
}
