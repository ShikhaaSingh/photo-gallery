# Photo Gallery

A simple photo gallery built with React and Tailwind CSS. It fetches photos from the Picsum Photos API and lets users search for photographers and save their favourite photos.

## Features

- Fetches 30 photos from the Picsum Photos API
- Displays photos in a responsive grid
- Search photos by photographer name
- Add or remove photos from favourites using the heart icon
- Saves favourites in local storage, so they remain after refreshing the page
- Shows loading and error states while fetching photos

## Tech Stack

- React
- Vite
- Tailwind CSS
- JavaScript
- Picsum Photos API

## React Concepts Used

- Custom hook (`useFetchPhotos`) for fetching photos
- `useReducer` to manage favourites
- `useEffect` for fetching data and saving favourites
- `useCallback` for event handlers
- `useMemo` for filtering photos
- `localStorage` for persistent favourites

## Run Locally

1. Clone the repository:

   ```bash
   git clone https://github.com/ShikhaaSingh/photo-gallery.git
   ```

2. Open the project folder:

   ```bash
   cd photo-gallery
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

5. Open the local URL shown in the terminal.

## API

Photos are fetched from the [Picsum Photos API](https://picsum.photos/v2/list?limit=30).

## Author

Shikha Singh
