import { JSONSchema } from 'objection';

export const UserValidation: JSONSchema = {
  type: 'object',
  title: 'User Schema Validation',
  required: ['email', 'role'],
  properties: {
    email: { type: 'string' },
    role: { type: 'string' },
    password: { type: 'string' },
  },
};
