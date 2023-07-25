"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserValidation = void 0;
exports.UserValidation = {
    type: 'object',
    title: 'User Schema Validation',
    required: ['email', 'role'],
    properties: {
        email: { type: 'string' },
        role: { type: 'string' },
        password: { type: 'string' },
    },
};
//# sourceMappingURL=user.validation.js.map