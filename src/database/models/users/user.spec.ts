import { Model } from 'objection';
import { BaseModel } from '../base';
import { UserModel } from './user.service';
import { UserValidation } from './user.validation';

describe('UserModel', () => {
  describe('User DB Model', () => {
    it('should return be define', () => {
      expect(UserModel).toBeDefined();
    });

    it('should extend Objection Model class', () => {
      expect(UserModel.prototype).toBeInstanceOf(Model);
    });

    it('should extend the BaseModel class', () => {
      expect(UserModel.prototype).toBeInstanceOf(BaseModel);
    });
    it('should have a json schema', () => {
      expect(UserModel.jsonSchema).toBeDefined();
    });
  });
});
