import { useEffect, useState } from 'react';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [error] = useState<Error | null>(null);
  const [hello, setHello] = useState('');

  useEffect(() => {
    // Simulate an API call
    setTimeout(() => {
      setIsLoading(false);
      setHello('Hello, World!');
    }, 2000);

    // Simulate an error
    // setTimeout(() => {
    //   setIsLoading(false);
    //   setError(new Error('Something went wrong'));
    // }, 2000);
  }, []);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <>
      <div className="text-3xl font-bold text-blue-500">{hello}</div>
    </>
  );
}

export default App;
