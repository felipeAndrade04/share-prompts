import { PromptType } from '@models/prompt';
import PromptCard from './PromptCard';

interface PromptCardListProps {
  data: PromptType[];
  handleTagClick: () => void;
}

function PromptCardList({ data, handleTagClick }: PromptCardListProps) {
  return (
    <div className='mt-16 prompt_layout'>
      {data.map((post) => (
        <PromptCard
          key={post._id.toString()}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  );
}

export default PromptCardList;
