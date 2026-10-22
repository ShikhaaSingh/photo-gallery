
import {
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  useState,
} from 'react'

import useFetchPhotos from '../hooks/useFetchPhotos'
import favouritesReducer from '../reducers/favouritesReducer'

function Gallery() {
  const { photos, loading, error } = useFetchPhotos()
  const [search, setSearch] = useState('')

  // Load saved favourites from localStorage
  const [favourites, dispatch] = useReducer(
    favouritesReducer,
    [],
    () => {
      try {
        const saved = JSON.parse(
          localStorage.getItem('favourites')
        )

        return Array.isArray(saved) ? saved : []
      } catch {
        return []
      }
    }
  )

  // Save favourites whenever they change
  useEffect(() => {
    try {
      localStorage.setItem(
        'favourites',
        JSON.stringify(favourites)
      )
    } catch (error) {
      console.error('Unable to save favourites:', error)
    }
  }, [favourites])

  // Add or remove a favourite
  const toggleFavourite = useCallback((photoId) => {
    dispatch({
      type: 'TOGGLE_FAVOURITE',
      photoId,
    })
  }, [])

  // Search photos by author
  const handleSearch = useCallback((event) => {
    setSearch(event.target.value)
  }, [])

  const filteredPhotos = useMemo(() => {
    return photos.filter((photo) =>
      photo.author.toLowerCase().includes(search.toLowerCase())
    )
  }, [photos, search])

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-blue-200 border-t-blue-600" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="p-8 text-center text-red-600">
        Error: {error}
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-slate-100 px-4 py-8 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <h1 className="mb-2 text-3xl font-bold text-slate-900">
          Photo Gallery
        </h1>

        <p className="mb-6 text-slate-600">
          Explore beautiful photos from talented photographers.
        </p>

        <input
          type="text"
          value={search}
          onChange={handleSearch}
          placeholder="Search by author name..."
          className="mb-8 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
        />

        {filteredPhotos.length === 0 ? (
          <p className="py-12 text-center text-slate-500">
            No photos found.
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {filteredPhotos.map((photo) => {
              const isFavourite = favourites.includes(photo.id)

              return (
                <article
                  key={photo.id}
                  className="overflow-hidden rounded-xl bg-white shadow-sm"
                >
                  <img
                    src={`https://picsum.photos/id/${photo.id}/500/350`}
                    alt={`Photo by ${photo.author}`}
                    className="h-56 w-full object-cover"
                    loading="lazy"
                  />

                  <div className="flex items-center justify-between p-4">
                    <p className="font-medium text-slate-800">
                      {photo.author}
                    </p>

                    <button
                      type="button"
                      onClick={() => toggleFavourite(photo.id)}
                      aria-label={
                        isFavourite
                          ? 'Remove from favourites'
                          : 'Add to favourites'
                      }
                      aria-pressed={isFavourite}
                      className={`rounded-full p-2 transition-colors ${
                        isFavourite
                          ? 'bg-red-50 text-red-600'
                          : 'text-slate-400 hover:bg-slate-100 hover:text-red-500'
                      }`}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill={isFavourite ? 'currentColor' : 'none'}
                        stroke="currentColor"
                        strokeWidth="2"
                        className="h-6 w-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78Z"
                        />
                      </svg>
                    </button>
                  </div>
                </article>
              )
            })}
          </div>
        )}
      </div>
    </main>
  )
}

export default Gallery
