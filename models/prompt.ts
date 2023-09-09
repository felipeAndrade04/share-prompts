import { Model, Schema, model, models } from 'mongoose';

export interface PromptType {
  _id: string;
  creator: {
    _id: string;
    username: string;
    email: string;
    image: string;
  };
  prompt: string;
  tag: string;
}

export interface IPrompt {
  creator: Schema.Types.ObjectId;
  prompt: string;
  tag: string;
}

const PromptSchema = new Schema<IPrompt>({
  creator: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  prompt: {
    type: String,
    required: [true, 'Prompt is required.'],
  },
  tag: {
    type: String,
    required: [true, 'Tag is required.'],
  },
});

const Prompt =
  (models.Prompt as Model<IPrompt>) || model<IPrompt>('Prompt', PromptSchema);

export default Prompt;
