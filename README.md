# Trustpair test

## Approach Taken

I started my implementation to create the TS types and both contexts since they are the core of the app. I decided to keep them separated since they are independent of each other even if linked by the assigned user and because it becomes easier to make them evolve. Since it was requested data persistence and all data manipulation were implemented in the context the responsibility of writing the updated data in the local storage was also placed in the context. The choice of the local storage to keep persistence was based on being easier compared to other methods and respecting the requirements.

The next step was to break the app UI into different components in a way that each component has its own responsibility and the less logic possible inside (a point that can still be improved, mainly in the form modal).

UI-related decisions:

1. List sorted by priority since it's the common behavior in this kind of apps and usually the user wants to do the more priority tasks before.
2. Two different lists to make it easier to keep track of completed and incomplete todos.
   2.1 I had a doubt about having the two lists also separated in the context instead of filtering and sorting the todo array every time i need to display one of them but i thought that was not worth it to the extra complexity of managing two arrays.

The routing system was not required but brings value to the app usability since we can have access to more data in the todo details page and we can see directly a todo using the URL.
The notification system was also not required but also brings value to the app because it's instant feedback that the action was done successfully, particularly useful when the todo list has a large amount of elements.

Time spent: ~ 7h

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `yarn test`

Launches the test runner in the interactive watch mode.\

## Deployment

[Vercel](https://tp-test-eight.vercel.app/)

## Tech improvements

- Setup an linting and styling system (ex. ESLint + Prettier).
- Use a translation library (ex. i18n) even if for now only exist one language so we could in a fast way introduce others in the future.
- Find a strategy to remove the "any" from the todo select elements.
- Use a custom hook to manage the form state.
- Find a better strategy to deal with the form validation.
- Place a single modal/notification component at the root level and use for example Portal to update the content (could also be done use using context).
- Better error handling if the fetch users endpoint fails.
- Add tests to both contexts

## Usability improvements

- Add responsive classes/grid
- Add draggable action to the todo cards.
- Add completed/update/delete action in the todo details page
- Implement a real 404 page

## Missing features

- Login page (In my repositories i have two similar examples [Example using react with Google Auth](https://github.com/aabarata/crown-clothing) - [Example using Vue with auth0](https://github.com/aabarata/vue_auth0_course))
