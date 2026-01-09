const { z } = require("zod");

// One definition used by ALL services
const signupSchema = z.object({
  email: z.string().email().trim().lowercase(),
  password: z.string().min(12).regex(/[0-9]/).regex(/[^a-zA-Z0-9]/),
  tenantId: z.string().min(1)
});

module.exports = { signupSchema };
