# End Session Instructions

1. Create a new file or use the existing file: `docs/changes/YYYY-MM-DD.log.md` using today's date.

2. Structure the update with sections:

   - Prompt
   - Development Steps
   - Key Decisions
   - Next Steps

3. For each section:

   - Use bullet points
   - Be specific and use technical terms
   - Keep content concise

4. Development Steps:

   - List modified files in dependency order
   - Number each step
   - Briefly describe changes and purpose for each file
   - Use past tense

5. Key Decisions:

   - List important decisions, their reasoning, and trade-offs
   - Use past tense

6. Next Steps:

   - List 1-3 prioritized tasks/features to work on next
   - Specify affected components/code areas
   - Highlight blockers or challenges
   - Use future tense
   - We don't care about performance and optimization for now.
   - We need to get the core functionality working for MVP.

7. For code blocks, prepend triple quotes with a space

8. End with a brief summary of overall progress and next session's focus

Example:

```markdown
# Session Update: 2024-09-09

## Prompt

- Refactor the Authentication module to simplify the structure and reduce redundancy.

### Development Steps

1. `app/styles/globals.css`: Updated color scheme and typography
   - Defined new color variables and font styles
2. `app/utils/api.ts`: Created new API utility functions
   - Implemented functions for fetching user data and posts
3. `app/components/Header.tsx`: Added responsive navigation menu
   - Created mobile-friendly dropdown menu using new styles
4. `app/pages/index.tsx`: Implemented hero section with CTA
   - Utilized new API functions to display dynamic content

### Key Decisions

- Chose Tailwind CSS for styling to improve development speed
- Implemented server-side rendering for better SEO performance

### Next Steps

1. Implement user authentication system
2. Create dashboard page for logged-in users
3. Optimize image loading and caching

Progress:
Completed main layout and homepage.
Next session will focus on user authentication and dashboard implementation.
```

9. Generate and execute a `git commit` message for the changes made during the session.

```shell
git add -A
git commit -m "A meaningful commit message"
git push
```
