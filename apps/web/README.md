## Getting Started
First, run the development server:

```bash
$ yarn dev
# or
$ npx turbo dev
```
Open [http://localhost:3100](http://localhost:3100) with your browser to see the result.

### Configuration
Duplicate the `.env.example` file provided in this project.
Rename the copied file to `.env.local`, set the value for each variable and restart the server if changes don't apply.

## Important routes
Below are the major entry routes for the survey application.
- Create a survey - `{baseUrl}/create`
- Take a survey - `{baseUrl}/suvery/{suvery_id}`
- View survey results - `{baseUrl}/suvery/{suvery_id}/results`

## Todos
- [x] Integrate Survey creation 
- [x] Integrate Save Survey response
- [ ] Integrate Survey results screen
- [ ] Improve request error handling

## Folder structure
* **components:** Reusable UI components.
* **config:** App and Tool configurations
* **hooks:** Reusable hooks
* **libs:** Project specify functions, utility functions and shared business logic
* **public:** For static assets
* **types:** Typescript shared interfaces/types

## Learn More
To learn more about Next.js, take a look at the following resources:
- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn/foundations/about-nextjs) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!
