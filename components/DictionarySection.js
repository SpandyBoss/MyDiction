import React, { useState } from 'react';
import axios from 'axios';
// ... (your imports)

const DictionarySection = () => {
  const [word, setWord] = useState('');
  const [definition, setDefinition] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchDefinition = async () => {
    try {
      setLoading(true);

      const apiKey = process.env.NEXT_PUBLIC_API_KEY;
      const apiUrl = `https://www.dictionaryapi.com/api/v3/references/collegiate/json/${word}?key=${apiKey}`;

      const response = await axios.get(apiUrl);

      if (!response.data || response.data.length === 0) {
        setError(`Definition not found for "${word}".`);
        setDefinition(null);
        setLoading(false);
        return;
      }

      const [primaryDefinition] = response.data;

      if (!primaryDefinition.def || primaryDefinition.def.length === 0) {
        setError(`Definition not found for "${word}".`);
        setDefinition(null);
        setLoading(false);
        return;
      }

      const {
        def: [{ sseq }],
        hwi: { prs },
        fl,
      } = primaryDefinition;

      if (!sseq || sseq.length === 0 || !sseq[0][0] || !sseq[0][0][1] || !sseq[0][0][1].dt || sseq[0][0][1].dt.length === 0) {
        setError(`Definition not found for "${word}".`);
        setDefinition(null);
        setLoading(false);
        return;
      }

      const structuredDefinition = {
        word,
        definition: sseq[0][0][1].dt[0][1],
        // examples:  || [],
        pronunciation: prs[0].mw || 'Pronunciation not available',
        partOfSpeech: fl || 'Part of speech not available',
        synonyms: sseq[0][0][0].syn ? sseq[0][0][0].syn.map((syn) => syn.mw) : [],
      };

      setDefinition(structuredDefinition);
      setError(null);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setError('Error fetching definition. Please try again.');
      setDefinition(null);
      setLoading(false);
    }
  };

  return (
    <section className="max-w-2xl mx-auto mt-8 p-6 bg-white shadow-lg rounded-md">
      <h2 className="text-3xl font-bold mb-4">Definition for &quot;{word}&quot;</h2>

      <div className="flex items-center mb-4">
        <input
          type="text"
          placeholder="Enter a word"
          className="w-full py-2 pl-8 pr-4 border border-gray-300 rounded"
          value={word}
          onChange={(e) => setWord(e.target.value)}
        />

        <button className="ml-2 bg-blue-500 text-white py-2 px-4 rounded" onClick={fetchDefinition}>
          Search
        </button>
      </div>

      {loading && <p>Loading...</p>}

      {error && <p className="text-red-500">{error}</p>}

      {definition && (
        <div className="mb-4">
          <strong>Definition:</strong>
          <p>{definition.definition}</p>
        </div>
      )}

      {definition && definition.examples && (
        <div className="mb-4">
          <strong>Examples:</strong>
          <ul>
            {definition.examples.map((example, index) => (
              <li key={index}>{example}</li>
            ))}
          </ul>
        </div>
      )}

      {definition && (
        <div className="mb-4">
          <strong>Pronunciation:</strong>
          <p>{definition.pronunciation}</p>
        </div>
      )}

      {definition && (
        <div className="mb-4">
          <strong>Part of speech:</strong>
          <p>{definition.partOfSpeech}</p>
        </div>
      )}

      {definition && definition.synonyms && (
        <div className="mb-4">
          <strong>Synonyms:</strong>
          {definition.synonyms.length > 0 ? (
            <p>{definition.synonyms.join(', ')}</p>
          ) : (
            <p>No synonyms found.</p>
          )}
        </div>
      )}
    </section>
  );
};

export default DictionarySection;
