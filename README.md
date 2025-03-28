# Pokedex

Pokédex is a simple and intuitive app that allows Pokémon fans to quickly find detailed information about all Pokémon.

## Main features

**Search Pokémon**:

- Easily search for your favorite Pokémon by name or Pokédex number.

**Pokémon List**:

- Browse through a comprehensive list of Pokémon. Each entry displays the Pokémon’s name, image, and unique Pokédex number.

**Pokémon Info**:

- When you select a Pokémon, you’ll see in-depth details, including stats, abilities, moves, and evolution information.

## Libraries Used

**Core Libraries**:

- **react** – Frontend framework.
- **react-router** – Client-side Routing for React.js.

**Development Tools**:

- **typescript** – A typed superset of JavaScript.
- **vite** – Fast development server and build tool optimized for modern web projects.

**UI & Utilities**:

- **tailwindcss** – A utility-first CSS framework for building custom designs without writing custom CSS.

**Additional Tools & Plugins**:

- **prettier** – This plugin allows to format files.
- **vite-plugin-compression2** – Compression for Vite builds.

## Website link

    -

## Installation

**Clone the Repository**:

- https://github.com/Mikolonija/pokemon.git

## Requirements

**Visual studio code**

- Recommended code editor for development.

**Node v22.13.0**

- Required to running the application.

## Running the program

1. **Navigate to the root project directory:**

- `Open terminal and navigate to the project folder.`

2. **Install dependencies:**

- `Run the following command:`

  ```sh
  npm install
  ```

3. **Start the development server:**

- `Run the following command:`

  ```sh
  npm run dev
  ```

4. **Open in the browser:**

- `Click the link provided in the terminal to view the project.`

## Format code

- `Run the following command:`

  ```sh
  npm run format
  ```

## Api

- `EndPoints`: https://pokeapi.co/api/v2
- `More info`:https://pokeapi.co/

## Design

- https://dribbble.com/shots/15128634-Pokemon-Pokedex-Website-Redesign-Concept

## Description of folders and files

### `/public`

- `logo.svg`: The project logo.

### `src/`

- `global.d.ts`: Global definitions.
- `main.ts`: Application initialization and mounting file.

#### `api/`

- `pokemon.ts`: Manages the fetching of Pokémon data.

#### `assets/`

- `*`: Project images.

#### `components/`

- `CurrentPokemon.tsx`: Displays detailed information about the selected Pokémon for desktop users.
- `CurrentPokemonMobile.tsx`:Displays detailed information about the selected Pokémon for mobile users.
- `PokemonsList.tsx`:Renders a list of Pokémon.

#### `config/`

- `index.tsx`: Main app configuration, including API URL.
- `pokemonStats.tsx`: Manages Pokémon stats.
- `pokemonTypes.tsx`: Handles Pokémon type data.

#### `hooks/`

- `useFetchPokemon.ts`:Custom hook for fetching data of a single Pokémon.
- `useFetchPokemons.ts`:Custom hook for fetching a list of Pokémon.

#### `/pages`

- `Home.tsx`: The home landing page of the app.
- `Main.tsx`: Contains the core layout and structure of the app.

#### `styles/`

- `index.css`: Main style configuration file.

#### `utils/types/enums`

- `pokemon.ts`: Pokemon related enums.

#### `utils/types/interfaces`

- `pokemon.ts`: Pokémon related interfaces.
- `pokemons.ts`: Pokémons related interfaces.

### `/`

- `.gitignore`: Specifies files and directories to ignore in Git.
- `.prettierrc`: Configuration file for code format.
- `index.html`: The main HTML file that serves as the entry point for the web app.
- `LICENSE`: The LICENSE file.
- `package-lock.json`: Locks the exact versions of project dependencies to ensure consistent installations across environments.
- `package.json`: Manages project metadata, dependencies, and scripts used in the project.
- `README.md`: Project documentation.
- `tsconfig.app.json`: TypeScript configuration for the app.
- `tsconfig.json`: The main TypeScript configuration file.
- `tsconfig.node.json`: TypeScript configuration for Node.js.
- `vite.config.ts`: Configuration file for Vite.
