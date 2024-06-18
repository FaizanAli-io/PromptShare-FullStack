import PromptCard from "./PromptCard";
import { useRouter } from "next/navigation";

const PromptCardList = ({ data, setData }) => {
  const router = useRouter();

  const handleTagClick = (post) => {
    console.log(post.tag);
  };

  const handleEdit = (post) => {
    router.push(`/prompt/update?id=${post._id}`);
  };

  const handleDelete = async (post) => {
    const hasConfirmed = confirm(
      "Are you sure you want to delete this prompt?"
    );

    if (hasConfirmed) {
      try {
        await fetch(`/api/prompt/${post._id.toString()}`, {
          method: "DELETE",
        });

        const reduced = data.filter((p) => p._id != post._id);
        setData(reduced);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="mt-16 prompt_layout">
      {data.map((post) => (
        <PromptCard
          post={post}
          key={post._id}
          handleEdit={() => handleEdit(post)}
          handleDelete={() => handleDelete(post)}
          handleTagClick={() => handleTagClick(post)}
        />
      ))}
    </div>
  );
};

export default PromptCardList;
