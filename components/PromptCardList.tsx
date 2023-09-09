import { PromptType } from '@models/prompt';
import PromptCard from './PromptCard';

interface PromptCardListProps {
  data: PromptType[];
  handleTagClick?: () => void;
  handleEdit?: (prompt: PromptType) => void;
  handleDelete?: (prompt: PromptType) => void;
}

function PromptCardList({
  data,
  handleTagClick,
  handleDelete,
  handleEdit,
}: PromptCardListProps) {
  return (
    <div className='mt-16 prompt_layout'>
      {data.map((post) => (
        <PromptCard
          key={post._id.toString()}
          post={post}
          handleTagClick={handleTagClick}
          handleDelete={handleDelete}
          handleEdit={handleEdit}
        />
      ))}
    </div>
  );
}

export default PromptCardList;
