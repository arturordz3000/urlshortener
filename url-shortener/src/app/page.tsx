"use client";

import ErrorAlert from './components/ErrorAlert';
import LoadingSpinner from './components/LoadingSpinner';
import Successful from './components/Successful';
import UrlInput from './components/UrlInput'
import { useShortener } from './hooks/useShortener';

export const HOME_TEST_ID = 'Home';
export const GO_BACK_TEST_ID = 'GoBack';

export default function Home() {
  const { shorten, isLoading, error, data, restart } = useShortener();
  const isError = error !== undefined;
  const isData = data !== undefined;
  const goBack: boolean = isError || isData;

  let content: React.JSX.Element = <UrlInput onShortenButtonClicked={shorten}/>;

  if (isLoading) {
    content = <LoadingSpinner />;
  } else if (isError) {
    content = <ErrorAlert />
  } else if (isData) {
    content = <Successful link={data.short_url} />
  }

  return (
    <main data-testid={HOME_TEST_ID} className="flex min-h-screen flex-col items-center justify-center p-24">
      {content}
      { goBack && <button type='button' onClick={() => restart()} data-testid={GO_BACK_TEST_ID} className="my-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Go back</button> }
    </main>
  )
}
