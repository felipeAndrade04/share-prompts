import { PromptType } from '@models/prompt';
import PromptCardList from './PromptCardList';

interface ProfileProps {
  name: string;
  description: string;
  data: PromptType[];
  handleEdit: () => void;
  handleDelete: () => void;
}

function Profile({
  name,
  description,
  data,
  handleDelete,
  handleEdit,
}: ProfileProps) {
  return (
    <section className='w-full'>
      <h1 className='head_text text-left'>
        <span className='blue_gradient'>{name} Profile</span>
      </h1>
      <p className='desc text-left'>{description}</p>

      <PromptCardList
        data={data}
        handleEdit={handleEdit}
        handleDelite={handleDelete}
      />
    </section>
  );
}

export default Profile;
