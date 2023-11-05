# Trustpair test

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

## Usability improvements

- Add responsive classes/grid
- Add draggable action to the todo cards.
- Implement a real 404 page

## Missing features

- Login page ([Example using Google Auth](https://github.com/aabarata/crown-clothing))
