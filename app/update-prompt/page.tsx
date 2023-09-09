'use client';

import React, { FormEvent, useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Form from '@components/Form';
import { PromptType } from '@models/prompt';

export interface Post {
  prompt: string;
  tag: string;
}

function UpdatePrompt() {
  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState<Post>({
    prompt: '',
    tag: '',
  });
  const router = useRouter();
  const searchParams = useSearchParams();
  const promptId = searchParams.get('id');

  useEffect(() => {
    async function getPrompt() {
      const response = await fetch(`/api/prompt/${promptId}`);
      const data: PromptType = await response.json();

      setPost({ prompt: data.prompt, tag: data.tag });
    }

    if (promptId) getPrompt();
  }, [promptId]);

  async function editPrompt(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);

    if (!promptId) return alert('Prompt ID not found');

    try {
      const response = await fetch(`/api/prompt/${promptId}`, {
        method: 'PATCH',
        body: JSON.stringify({
          prompt: post.prompt,
          tag: post.tag,
        }),
      });
      if (response.ok) {
        router.push('/');
      }
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Form
      type='Edit'
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={editPrompt}
    />
  );
}

export default UpdatePrompt;
