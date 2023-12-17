"use client";

import ErrorAlert from './components/ErrorAlert';
import LoadingSpinner from './components/LoadingSpinner';
import UrlInput from './components/UrlInput'
import { useShortener } from './hooks/useShortener';

export const HOME_TEST_ID = 'Home';

export default function Home() {
  const { shorten, isLoading, error, data } = useShortener();

  let content: React.JSX.Element = <UrlInput onShortenButtonClicked={shorten}/>;

  if (isLoading) {
    content = <LoadingSpinner />;
  } else if (error !== undefined) {
    content = <ErrorAlert />
  } else if (data !== undefined) {
    content = <>Successful</>
  }

  return (
    <main data-testid={HOME_TEST_ID} className="flex min-h-screen flex-col items-center justify-center p-24">
      {content}
    </main>
  )
}
