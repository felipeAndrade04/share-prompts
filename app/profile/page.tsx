'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Profile from '@components/Profile';
import { PromptType } from '@models/prompt';

function ProfilePage() {
  const [posts, setPosts] = useState<PromptType[]>([]);
  const router = useRouter();
  const { data: session } = useSession();

  useEffect(() => {
    async function loadPosts() {
      const response = await fetch(`/api/users/${session?.user.id}/posts`);
      const data = await response.json();

      setPosts(data);
    }

    if (session?.user.id) loadPosts();
  }, []);

  function handleEdit(prompt: PromptType) {
    router.push(`update-prompt?id=${prompt._id}`);
  }

  async function handleDelete(prompt: PromptType) {
    const hasConfirmed = confirm(
      'Are you sure you want to delete this prompt?'
    );

    if (hasConfirmed) {
      try {
        await fetch(`/api/prompt/${prompt._id}`, {
          method: 'DELETE',
        });

        const filteredPosts = posts.filter((post) => post._id !== prompt._id);

        setPosts(filteredPosts);
      } catch (error) {
        console.log(error);
      }
    }
  }

  return (
    <Profile
      name='My'
      description='Welcome to your personalized profile page'
      data={posts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
}

export default ProfilePage;
