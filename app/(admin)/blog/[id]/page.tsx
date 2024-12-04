import { EditPostForm } from "@/components/(admin)/edit-post-form";

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  return {
    title: `Edit post ${id}`,
  };
};

const EditPost = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;

  return <EditPostForm postId={id} />;
};

export default EditPost;
