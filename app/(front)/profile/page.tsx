import { Metadata } from "next";

import { EditProfileForm } from "@/components/(front)/edit-profile-form";

export const metadata: Metadata = {
  title: "Профіль користувача",
};

const Profile = () => {
  return (
    <div className="container py-10 flex justify-center items-center">
      <EditProfileForm />
    </div>
  );
};

export default Profile;
