import { useEffect, useState } from 'react';
import { FakeAd } from '../fake_ad/FakeAd';

export const ProgessView = ({ taskId }: { taskId: string }) => {
   
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState('Pending');

  useEffect(() => {
    if (!taskId) return;

    const eventSource = new EventSource(
      `http://localhost:4000/progress/${taskId}`
    );

    eventSource.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        setProgress(data.progress);
        setStatus(data.status);
      } catch (error) {
        console.error('error parsing progress data: ', error);
      }
    };
    eventSource.onerror = () => {
      console.error('an error has occurred while receiving data: ');
      eventSource.close();
    };
    return () => {
      eventSource.close();
    };
  }, [taskId]);

  return (
    <div className="flex flex-col items-center w-full max-w-md mx-auto p-5">
      <FakeAd></FakeAd>
      <div className="w-full h-5 bg-gray-300 rounded-lg overflow-hidden">
        <div
          className="h-full bg-green-500 transition-all ease-linear duration-500"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      <div className="mt-2 text-sm text-gray-800">
        {status} - {progress}%
      </div>
    </div>
  );
};
