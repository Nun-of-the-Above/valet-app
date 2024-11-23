<p align="center">
  <img src="./valet-logo.png" alt="VALET Logo" width="200"/>
</p>

# VALET - Voting app for an immersive theatre experience

This is a custom-built app for the theatrical performance _VALET_ by Revet Scenkonst in Gothenburg, Sweden.
See [www.revetscenkonst.se](https://www.revetscenkonst.se) for more info (website also built by me).

The play is based on a tree-like storyline where the audience changes the course of the show by voting to keep characters in the show. The character with the least votes is removed each voting round until only one remains.

(Embed Excalidraw of tree structure)

The app uses a mix of TailwindCSS and ChakraUI for styling. (Will convert to StyledComponents)

There is no routing in the app. Instead authentication through Firebase determines if AdminPanel or UserPanel should be rendered. (Add routing).

Will probably transition entire project to Typescript in the future.

## Available Scripts

In the project directory, you can run:

### `npm run local`

Runs the app with Firebase emulator suit (firestore, Cloud Functions, Authentication, hosting).\
Open [http://localhost:4000](http://localhost:4000) to view the emulator dashboard in your browser.
