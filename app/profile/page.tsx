'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Profile from '@components/Profile';
import { PromptType } from '@models/prompt';

function ProfilePage() {
  const [posts, setPosts] = useState<PromptType[]>([]);
  const { data: session } = useSession();

  useEffect(() => {
    async function loadPosts() {
      const response = await fetch(`/api/users/${session?.user.id}/posts`);
      const data = await response.json();

      setPosts(data);
    }

    if (session?.user.id) loadPosts();
  }, []);

  function handleEdit() {}

  async function handleDelete() {}

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
