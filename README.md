# Trustpair test

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `yarn test`

Launches the test runner in the interactive watch mode.\

## Deployment

[https://tp-test-eight.vercel.app/](Vercel)

## Improvements points

- Setup an linting and styling system (ex. ESLint + Prettier)
- Use a translation library (ex. i18n) even if for now only exist one language so we could in a fast way introduce others in the future
- Find a strategy to remove the "any" from the todo select elements
- Use a custom hook to manage the form state
- Place a single modal/notification component at the root level and use for example Portal to update is content (could also be use using context)
- Better error handling if the fetch users endpoint fails

## Usability improvements

- Navigation to a todo detail page
- Add draggable action to the todo cards
