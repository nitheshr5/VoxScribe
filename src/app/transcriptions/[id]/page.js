export default function TranscriptionDetailPage({ params }) {
    const { id } = params;
  
    return (
      <div>
        <h1>Transcription ID: {id}</h1>
        <p>Details about the transcription will be shown here.</p>
      </div>
    );
  }
  